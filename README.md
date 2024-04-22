# Teste Técnico Shopper.com.br - Sistema de Atualização de Preços

## 1º Passo: Clonar repositório do GitHub

Para acessar a aplicação o primeiro passo é clonar o repositório do GitHub para seu repositório local.

### Via HTTPS

Para clonar utilize o comando abaixo:

```bash
git clone https://github.com/andreresende36/teste-shopper.git
```

Obs.: caso não tenha o Git instalado, siga o passo a passo do seguinte link: [Tutorial de Instalação do Git](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git)

## 2º Passo: Instalar o Docker

Para rodar a aplicação o sistema precisa ter instalado o `Docker 24.0.2 ou superior` e o `Docker-compose`. Para isso siga o passo a passo dos links abaixo de acordo com seu sistema operacional:

[Tutorial de Instalação do Docker](https://docs.docker.com/engine/install/)

[Tutorial de Instalação do Docker-compose](https://docs.docker.com/compose/install/)

Caso você use uma distribuição Linux baseada em Debian (Ubuntu, POP OS, Linux Lite, etc), você pode seguir o passo a passo copiando e executando em seu terminal cada um dos comandos abaixo:

```bash
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$UBUNTU_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
newgrp docker
VERSION=$(curl --silent https://api.github.com/repos/docker/compose/releases/latest | jq .name -r)
DESTINATION=/usr/local/bin/docker-compose
sudo curl -L https://github.com/docker/compose/releases/download/${VERSION}/docker-compose-$(uname -s)-$(uname -m) -o $DESTINATION
sudo chmod 755 $DESTINATION
sudo apt install gnome-keyring
```

### Obs.: Para o Docker-compose funcionar, após a instalação acima você deve abrir outra janela do terminal para continuar os passos abaixo.

## 3º Passo: Comando de inicialização

Agora é só entrar na pasta do projeto e rodar o script `app.sh`. O comando está abaixo:

```bash
cd teste-shopper/ && sh app.sh
```

Obs.: esse comando pode demorar um pouco para finalizar, pois além de instalar as dependências do projeto, ele cria e ativa contêineres Docker.

## 4º Passo: Iniciar a aplicação Frontend em seu navegador

### Acesse o endereço [http://localhost:3000](http://localhost:3000) em seu navegador e use a aplicação! 😁
