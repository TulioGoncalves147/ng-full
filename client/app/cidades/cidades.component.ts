import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CidadeService } from '../services/cidade.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrls: ['./cidades.component.scss']
})

export class CidadesComponent implements OnInit {

  cidade = {};
  cidades = [];
  isLoading = true;
  isEditing = false;

  addCidadeForm: FormGroup;
  name = new FormControl('', Validators.required);
  codIBGE = new FormControl('', Validators.required);
  //weight = new FormControl('', Validators.required);

  constructor(private cidadeService: CidadeService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getCidades();
    this.addCidadeForm = this.formBuilder.group({
      name: this.name,
      codIBGE: this.codIBGE
    });
  }

  getCidades() {
    this.cidadeService.getCidades().subscribe(
      data => this.cidades = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCidade() {
    this.cidadeService.addCidade(this.addCidadeForm.value).subscribe(
      res => {
        const newCidade = res.json();
        this.cidades.push(newCidade);
        this.addCidadeForm.reset();
        this.toast.setMessage('item adicionado com sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(cidade) {
    this.isEditing = true;
    this.cidade = cidade;
  }

  cancelEditing() {
    this.isEditing = false;
    this.cidade = {};
    this.toast.setMessage('edição de item cancelada.', 'warning');
    // reload the cidades to reset the editing
    this.getCidades();
  }

  editCidade(cidade) {
    this.cidadeService.editCidade(cidade).subscribe(
      res => {
        this.isEditing = false;
        this.cidade = cidade;
        this.toast.setMessage('item editado com sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCidade(cidade) {
    if (window.confirm('Tem certeza de que deseja excluir este item permanentemente?')) {
      this.cidadeService.deleteCidade(cidade).subscribe(
        res => {
          const pos = this.cidades.map(elem => elem._id).indexOf(cidade._id);
          this.cidades.splice(pos, 1);
          this.toast.setMessage('item deletado com sucesso.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}