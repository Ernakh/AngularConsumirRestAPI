import { Component } from '@angular/core';
import { PessoaService } from './services/pessoa.service';
import { Pessoa } from './models/pessoa';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OiMundo';

  pessoa = {} as Pessoa;
  pessoas: Pessoa[] = [];

  constructor(private pessoaService: PessoaService) {}
  
  ngOnInit() {
    this.getPessoas();
  }

  addPessoa(){
    this.pessoa.nome = "Astolfo";
    this.pessoaService.savePessoa(this.pessoa);
 
  }

  savePessoa(form: NgForm) {
    if (this.pessoa.id !== undefined) {
      this.pessoaService.updatePessoa(this.pessoa).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.pessoaService.savePessoa(this.pessoa).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  SavePessoaNome(n: string){
    this.pessoa.nome = n;
    this.pessoaService.savePessoa(this.pessoa);
  }

  getPessoas() {
    this.pessoaService.getPessoas().subscribe((pessoas: Pessoa[]) => {
      this.pessoas = pessoas;
    });
  }

  deletePessoa(pessoa: Pessoa) {
    this.pessoaService.deletePessoa(pessoa).subscribe(() => {
      this.getPessoas();
    });
  }

  editPessoa(pessoa: Pessoa) {
    this.pessoa = { ...pessoa };
  }

  cleanForm(form: NgForm) {
    this.getPessoas();
    form.resetForm();
    this.pessoa = {} as Pessoa;
  }



}
