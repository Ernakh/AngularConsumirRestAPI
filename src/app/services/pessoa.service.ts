import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  url = 'http://localhost:5291/api/pessoas';

  // injetando o HttpClient

  constructor(private httpClient: HttpClient) { }
  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todas pessoas
  getPessoas(): Observable<Pessoa[]> {
    return this.httpClient.get<Pessoa[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

   // Obtem uma pessoa pelo id
   getPessoaById(id: number): Observable<Pessoa> {
    return this.httpClient.get<Pessoa>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // salva uma pessoa
  savePessoa(pessoa: Pessoa) : Observable<Pessoa>{
    return this.httpClient.post<Pessoa>(this.url, JSON.stringify(pessoa), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza uma pessoa
  updatePessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.httpClient.put<Pessoa>(this.url + '/' + pessoa.id, JSON.stringify(pessoa),
     this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta uma pessoa
  deletePessoa(pessoa: Pessoa) {
    return this.httpClient.delete<Pessoa>(this.url + '/' + pessoa.id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  addPessoa(pessoa: Pessoa){
    console.log(this.url, JSON.stringify(pessoa))
    return this.httpClient.post<Pessoa>(this.url, JSON.stringify(pessoa))
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
    // Manipulação de erros
    handleError(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Erro ocorreu no lado do client
        errorMessage = error.error.message;
      } else {
        // Erro ocorreu no lado do servidor
        errorMessage = `Código do erro: ${error.status}, ` +
        `mensagem: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    };
}
