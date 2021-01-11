import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formcard',
  templateUrl: './formcard.component.html',
  styleUrls: ['./formcard.component.scss']
})
export class FormcardComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  formCard:FormGroup;
  form = {
    cardNumber:null
  }


  NumeroSuerte:number;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.formCard = this.formBuilder.group({
      'cardNumber':['', [Validators.required, Validators.minLength(14), Validators.maxLength(16)]]
    });
  }

  get f() { return this.formCard.controls; }


  calcularNumerodeLaSuerte(form){
    let numero:number = this.f.cardNumber.value;

    if(numero.toString().length <14 ||  numero.toString().length > 16){
      this.messageError('Debe tener entre 14 y 16 Digitos');
      return;
    }


    const mostRepeat = ar => ar.reduce((acum, el, i, ar) => {
      const count=ar.filter(e => e==el).length;
      return count > acum[1] ? [el, count] : acum;
      }, ["", 0]
    )

    if(this.formCard.valid){
      this.printRepeat(numero);
      let ar = numero.toString().split("");
      this.NumeroSuerte = mostRepeat(ar)[0];
    }

  }

  
  printRepeat(numero){

    let cardNumber = numero.toString().split("");
    cardNumber.sort();
    cardNumber.forEach(function (currentValue, index, array) {
    if(index !== array.length && currentValue === array[index+1]){
          console.log(currentValue  + ' esta repetido');
        }
    });
  }


  messageError(msg:string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
    })
  }

}
