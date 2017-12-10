import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { PaisService } from '../services/pais.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.scss']
})
export class PaisesComponent implements OnInit {

  pais = {};
  paises = [];
  isLoading = true;
  isEditing = false;

  addPaisForm: FormGroup;
  name = new FormControl('', Validators.required);
  codBACEN = new FormControl('', Validators.required);

  constructor(private paisService: PaisService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getPaises();
    this.addPaisForm = this.formBuilder.group({
      name: this.name,
      codBACEN: this.codBACEN
    });
  }

  getPaises() {
    this.paisService.getPaises().subscribe(
      data => this.paises = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addPais() {
    this.paisService.addPais(this.addPaisForm.value).subscribe(
      res => {
        const newPais = res.json();
        this.paises.push(newPais);
        this.addPaisForm.reset();
        this.toast.setMessage('item adicionado com sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(pais) {
    this.isEditing = true;
    this.pais = pais;
  }

  cancelEditing() {
    this.isEditing = false;
    this.pais = {};
    this.toast.setMessage('edição de item cancelada.', 'warning');
    // reload the paises to reset the editing
    this.getPaises();
  }

  editPais(pais) {
    this.paisService.editPais(pais).subscribe(
      res => {
        this.isEditing = false;
        this.pais = pais;
        this.toast.setMessage('item editado com sucesso', 'success');
      },
      error => console.log(error)
    );
  }

  deletePais(pais) {
    if (window.confirm('Tem certeza de que deseja excluir este item permanentemente?')) {
      this.paisService.deletePais(pais).subscribe(
        res => {
          const pos = this.paises.map(elem => elem._id).indexOf(pais._id);
          this.paises.splice(pos, 1);
          this.toast.setMessage('item excluído com sucesso.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}