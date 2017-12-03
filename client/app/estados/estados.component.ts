import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { EstadoService } from '../services/estado.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.scss']
})
export class EstadosComponent implements OnInit {

  estado = {};
  estados = [];
  isLoading = true;
  isEditing = false;

  addEstadoForm: FormGroup;
  name = new FormControl('', Validators.required);
  UF = new FormControl('', Validators.required);
  codIBGE = new FormControl('', Validators.required);

  constructor(private estadoService: EstadoService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getEstados();
    this.addEstadoForm = this.formBuilder.group({
      name: this.name,
      UF: this.UF,
      codIBGE: this.codIBGE
    });
  }

  getEstados() {
    this.estadoService.getEstados().subscribe(
      data => this.estados = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addEstado() {
    this.estadoService.addEstado(this.addEstadoForm.value).subscribe(
      res => {
        const newEstado = res.json();
        this.estados.push(newEstado);
        this.addEstadoForm.reset();
        this.toast.setMessage('item adicionado com sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(estado) {
    this.isEditing = true;
    this.estado = estado;
  }

  cancelEditing() {
    this.isEditing = false;
    this.estado = {};
    this.toast.setMessage('edição de item cancelada.', 'warning');
    // reload the estadoos to reset the editing
    this.getEstados();
  }

  editEstado(estado) {
    this.estadoService.editEstado(estado).subscribe(
      res => {
        this.isEditing = false;
        this.estado = estado;
        this.toast.setMessage('item editado com sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteEstado(estado) {
    if (window.confirm('Tem certeza de que deseja excluir este item permanentemente?')) {
      this.estadoService.deleteEstado(estado).subscribe(
        res => {
          const pos = this.estados.map(elem => elem._id).indexOf(estado._id);
          this.estados.splice(pos, 1);
          this.toast.setMessage('item excluído com sucesso.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
