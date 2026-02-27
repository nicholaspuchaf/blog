# Entendendo os interstícios das Lambdas

## Introdução
<br/>

Lambdas é um serviço da AWS que permite executar código na nuvem AWS sem se preocupar com provisionamento de infraestrutura, diferente de EC2. Lambdas, permitem que subamos código Node, Python, Java, Go, Rust ... direto para AWS em forma de um pacote zip por exemplo (é possível de outras maneiras também), e a AWS da o jeito dela de gerar o ambiente para executar seu código e inclusive escalar a execução de suas Lambdas caso cheguem mais requisições de execução.
<br/>

De cara já é possível ver algumas das vantagens de utilizar Lambdas em relação a EC2. Normalmente, EC2 requer um alto grau de configuração antes de botar seu código para rodar, precisa escolher o tipo de máquina (ARM64, x86, AMD64...), qual sistema operacional vai utilizar (Linuxes..., Windows Server), escolher qual versão vai utilizar, configurar redes de segurança VPC para sua máquina ter uma rede local para rodar, configurar portas da máquina.
<br/>

Depois de tudo isso, ainda vai precisar configurar a máquina para instalar as depêndencias que vai utilizar, para ai só depois começar a rodar seu código. Isso sem falar que vai precisar dar manutenção para essa máquina ligar (experimenta esquecer sua EC2 rodando sem executar nada para ver o que vai acontecer com sua Bill no final do mês).
<br/>

A computação em Lambdas resolve esse tipo de problema, não precisa seu preocupar com essas coisas apenas em subir o código e observar sua plena execução. Entretaaaanto, esses benefícios vem com alguns contras também que preciamos nos atentar, pelo fato da AWS gerenciar tudo para você é o custo de execução por segundo por CPU em Lambda é maior que em EC2, por isso é bom ter isso em mente ao escolher Lambdas. Não só isso, Lambdas tem um tempo máximo de execução de 15 minutos, mais que isso a Lambda sempre dá Timeout. Por isso, claro Lambdas tem enormes vantagens (não é atoa que é vem se tornando o padrão do mercado), mas não é uma ferramente mágica que resolve qualquer problema.

## Casos de usos comuns de Lambdas

## Vamos agora a um exemplo de inicialização de uma Lambda com código CDK

# O que é CDK ?
É um jeito IaC (temos post sobre isso) de provisionar serviços na AWS, vamos utilizar isso para subir nossa primeira Lambda.

# Mãos a obra
Vamos iniciar nosso projeto cdk
Instale aws no seu sistema e logue com suas credenciais

    npm install aws-cdk -g no seu sistema 
    mkdir lambda-project && cd lambda-project

    cdk init app --language typescript

Isso vai iniciar seu projeto CDK que vai utilizar typescript (há outras opções para utilizar, por favor verifique na DOC da AWS).

Depois da inicialização do projeto é imporante executar o seguinte comando

    cdk bootstrap

Esse comando vai provisionar na AWS um SET de serviços básicos para conseguir fazer o deploy do seu CDK. Inclui algumas permissões de IAM Role, um S3 Bucket para salvar seu projeto CDK e algumas configurações.

Vamos criar nossa função Lambda, ela será descrita no arquivo lib/lambda-project-stack.ts

```ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// Import the Lambda module
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class LambdaProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const minhaLambda = new lambda.Function(this, 'MinhaLambda', {
      runtime: lambda.Runtime.NODEJS_20_X, // Essa Lambda por exemplo utiliza NodeJS para executar, poderia ser outra linguagem
      handler: 'index.lambda_handler', // Aqui é onde essa lambda vai puxar o handler (a funcao pricipal que sua Lambda vai executar)
      code: lambda.Code.fromAsset(lambdaPath), // Aqui o local de onde ela vai puxar o código
      timeout: cdk.Duration.seconds(5), // Um timeout para a Lambda falhar caso chegar (max é 15 min), interessante para controlar custos
      memorySize: 128, // O tanto de memória que quer reservar para ela em MB
      reservedConcurrentExecutions: 1, // O número máximo de execuções em paralelo que a sua Lambda pode ter, excelente para controle de custos
      architecture: lambda.Architecture.ARM_64, // Execucao em ARM costuma ser mais barata
      environment: {
        // Variáveis de ambiente para a Lambda, exemplo de acesso a uma tabela DynamoDB
        TABLE_NAME: myTable.tableName
      },
      layers: [] // Se quiser passar algum Layer para Lambda
    });
  }
}
```

Nem todas as configurações descritas são obrigatórias para inicalizar as Lambdas, inclusive há muitas mais para conferir nesse Link
<br/>

https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Function.html
<br/>

Agora vamos configurar nossa Lamba para ela pode receber requisções HTTPS para ser executada.
Inclusive vamos utilizar um padrão excelente de desenvolvimento que é puxar os secrets da nossa Lambda pelo SSM Parameters Store (poderia ser o Secrets Manager também).

```ts
const siteUrl = ssm.StringParameter.fromStringParameterAttributes(
    this,
    'SiteUrlParameter', {
        parameterName: '/mySecret/frontend/site-url'
    }
).stringValue;

const minhaLambdaURL = minhaLambda.addFunctionUrl({
    authType: lambda.FunctionUrlAuthType.NONE,
    cors:{
        allowedOrigins: [siteUrl],
        allowedMethods: [lambda.HttpMethod.GET, lambda.HttpMethod.POST],
        allowedHeaders: ['content-type', 'x-api-key'],
        maxAge: cdk.Duration.days(1),
    }
});
```

Agora basta executar

    cdk diff

Para verificar qual o projeto CloudFormation que será gerada

    cdk deploy 

Par deployarmos nosso código na AWS.


## Pulos do Gato

### Cold Start e Warm Start

Cold Start é um conceito muito importante de se saber ao se utilizar Lambdas. Quando utilizamos Lambda, subimos o código para a AWS executar, nisso, a AWS disponibiliza um ambiente na nuvem para executar esse código, nisso conta um sistema operacional, uma VM dentro dele e também a inicialização do seu código bem como de todas as bibliotecas que você vai utilizar.
Esse processo, por vezes é demorado porque precisa carregar vários passos, precisa inicializar ambiente, variavies e tals, isso é chamado de Cold Start, porque é preciso pegar o sistema frio (do zero) e prepará-lo para executar seu código.
<br/>

Entretanto, uma vez que esse ambiente foi inicializado (um processo "caro") a AWS (costuma) manter esse ambiente por torno de 15 minutos ativo para esperar que essa Lambda seja executada novamente, e caso ela seja executada novamente ele vai reutilizar o ambiente já carregado, esse processo torna muito mais rápida a execução da Lambda e também muito mais barata, isso é chamado de Warm Start. 
<br/>

Não só isso, caso o ambiente não seja reinicializado (perder o Warm Start), é possível definir variaveis globais e de ambiente que podem ser reutilizadas entre várias execuções das Lambdas, ai que entra outra sacada, é possível desenolvedor a Lambda de tal forma que se aproveite desses casos para ter um desempenho ainda melhor, por exemplo tentar se beneficiar de um cache entre execuções Lambda e evitar fazer o trabalho de computação do 0 - TODAS as vezes. Por isso, quando for utilizar Lambdas tenha em mente Cold Start e Warm Start !

### Concurrency

Concurreny, esse é outro conceito importante ao se trabalhar com aplicações serverless na AWS, como as Lambdas por exemplo. Concurrency significa execução de computação em paralelo, ou seja, caso várias requisições sejam feitas às suas Lambdas, é possível alocar uma execução Lambda para cada para que o processamento seja feito em paralelo, e consequentemente de forma muito mais rápida.
<br/>

Entretanto, como tudo nessa vida não é flores, ao se trabalhar com execução em paralelo isso vai acarretar em um custo maior, jutasmente porque vai precisar alocar mais Lambdas para executar, levando a mais Cold Starts ... e assim por diante. Entretanto, para muitas aplicações isso não só é benéfico mas é imprescindível. Por isso saber não só que é possível usar paralelismo, mas também o quanto usar, saber identificar esse balanço que traga benefício sem comprometer os custos.
<br/>

Um último detalher importante de destar é que se for utilizar em projetos pequenos/hobbies pode ser interessante limitar a concurreny para um número baixo para evitar um aumento exacerbado de custos.

### Payload

Ao executar um Lambda podemos passar para ela um paylod (por exemplo um body e headers de um requisição http chegada pelo API Gateway), porém esse payload tem um limite baixo e caso deseje executar uma Lambda com um payload maior é possível escrever dentro de um Bucket S3 e passar a referência de acesso desse Bucket para a Lambda

<img src="https://pub-c0e6861037f244b7b26069b64c535015.r2.dev/lambda_01.png" />
