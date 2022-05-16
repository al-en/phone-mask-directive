import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  form: FormGroup = this.formBuilder.group({
    phoneNumber: ["",[Validators.required,Validators.pattern(/\(\d\d\d\) \d\d\d-\d\d\d\d/)]]
  });

  constructor(
    private formBuilder: FormBuilder) { }

  doSubmit(){
    /**
     * Do the submit of the form
     */
    if(this.form.valid){
      // Get the phoneNumber Control object
      let phoneNumberControl = this.form.get('phoneNumber');

      // Get just the numeric values from the phone Number Control
      let modelValue = phoneNumberControl?.value.replace(/[^\d]/g,''); 
      
      
      if(modelValue.length!=10){
        modelValue=null; 
      }

      // Update the value of the Control with just the numeric values.
      phoneNumberControl?.patchValue(modelValue);

      // Show the final valuexs
      alert(`The phone number in the model is:  ${phoneNumberControl?.value}`);
      
      this.form.reset();
    }
    else{
      alert("The form is not valid");
    }
  
  }
  
}
