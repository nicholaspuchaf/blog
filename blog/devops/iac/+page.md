
# O que é Infrastructure as Code e quais os benefícios de adotar ?


### O que é ? 

Infrastructure as Code é um meio de controloar, configurar e provisionar infraestrutura de computação em nuvem. Ele permite que transformemos o que antes era uma tarefa longa e maçante de configurar os serviços computacionais manualmente por dashboards, e código (seja ele CDK, Terraform, Cloudformation...), o que fornece diversos benefícios como versionamento da estrutura em repositórios com o Github e finalmente acabar com na minha máquina a configuração funciona e com pequenas configurações esquecidas.

### Por que utilizar ?

Já dei uma palinha acima de porque utilizar, mas vamos dar uma aprofundada.<br/>
Poder realizar o versionamento da infraestrutura permite uma análise minuciosa de como a infraestrutura cresceu ao longo dos anos de desenvolvimento, o que facilita entender uma mudança de custos ao longo do tempo ou até mesmo ter uma estrutura bem definida de porque algumas decisões de projetos foram tomadas lá atrás.

Outro motivo importante é poder enforçar vários padrões de provisionamento de infraesturtura ao longo de todo projeto, mesmo que o engenheiro principal que definiu as regras a serem seguidas já tenha saído. <br/>
Além disso, permite também serem executadas ferramentas de análise de código que buscam configurações vúlneráveis no provisionamento da infraestrutura (mais para frente vou abordar algumas dessas ferramentas). 

### Como utilizar ?

IaC é possível ser implementado de vários formas diferentes, que inclusive vem evoluindo com o tempo.

Algumas das mais famosas opções, Terraform (que permite desenvolvimento em vários clouds diferentes), AWS CDK (focado na AWS), tem também IaC que são pouco diferentes dessas duas como o CloudFormation e o Serverless Framework.




