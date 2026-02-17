---
layout: '$lib/layouts/BlogPost.svelte'
---

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


## Tópicos diferenciados

