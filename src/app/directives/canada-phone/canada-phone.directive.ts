import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[canadaPhone]'
})
export class CanadaPhoneDirective {

  constructor(private elementRef:ElementRef<HTMLInputElement>) { }


  @HostListener('keyup',['$event']) 
  onKeyUp($event:KeyboardEvent){
    let inputValue = this.elementRef.nativeElement.value;
    let keyPressed = $event.key;
 
    if(!/[0-9]/.test(keyPressed) && !['Backspace'].includes(keyPressed) || inputValue.length>14){
      return false;
    }
    
    this.elementRef.nativeElement.value = this.formattedValue(inputValue);
    return true;
  }


  @HostListener('keypress',['$event'])
  onKeyPress($event:KeyboardEvent){
    let inputValue = this.elementRef.nativeElement.value;
    let keyPressed = $event.key;
    
    if(!/[0-9]/.test(keyPressed) && !['Backspace'].includes(keyPressed) || inputValue.length>=14){
      return false;
    }

    return true;
  }

  
  /**
   * Change the value sent to the expected format.
   * @param inputValue The value with no transformations. Extracted from the input.
   * @param maskFormat The format expected to be.
   * @param toBeReplaced The character that is going to be replaced.
   * @returns The value formatted as expected
   */
  private formattedValue(inputValue:string,maskFormat:string="(___) ___-____",toBeReplaced:string='_'){
    let onlyNumbers = inputValue.replace(/[^\d]/g,'');
    let onlyNumbersArray = onlyNumbers.split('');

    let maskAsStringArray = maskFormat.split('');
    let finalValue = '';
    let position = 0;

    // Avoid 1 as fist digit in the phone number
    if(onlyNumbersArray[0]=='1'){
      onlyNumbersArray.shift();
    }

    maskAsStringArray.every(element => {
      if(position>=onlyNumbersArray.length){
        return false;
      }

      if(element==toBeReplaced){
        finalValue += onlyNumbersArray[position];
        position++;
      }
      else{
        finalValue += element;
      }
      return true;
    });
    
    return finalValue;
    
  }

}
