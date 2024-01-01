# Table - Criado Através da Interface @angular/material

Este projeto é um componente Table. O componente foi criado através de linha de comando.  Para criar esse componente, tem que esta com a biblioteca de interface `@angular/material`. Dessa forma, toda a estrutura de código para que a tabela funcine é criado dentro deste componente.

## Versões
```json
Angular CLI: 16.2.11
Node: 18.16.0
Package Manager: npm 9.5.1
```

## Criando projeto e instalando biblíoteca `@angular/material`
    1 - ng new <nomeProjeto>
    2 - ng add @angular/material

## Criando componente
    - ng g @angular/material:table tabela

Você criando o componente dessa forma, já é incluso como default, a ordenação e também a paginação. Você pode escolher a quantidade de itens que deseja mostrar na tela. O default é `[pageSizeOptions]="[5, 10, 20]"`, mas pode ser alterado. A quantidade de itens que será mostrado na página quando ela carrega o default é 10 `[pageSize]="10"`. Mas pode ser alterado com outro que esteja dentro do array `[pageSizeOptions]`
    


No arquivo `app.component.html` onde aparece o conteúdo da projeto, apague todo o conteúdo da página, e em seguida importa o sidenav que foi criado `<app-tabela></app-tabela>`. Dessa forma, o conteúdo da tabela irá aparecer.

### screen
<img src="src\assets\img\1.png" width="100%">

<h1 align="center">💻 Desenvolvido Por: Gilberto Júnior</h1>
