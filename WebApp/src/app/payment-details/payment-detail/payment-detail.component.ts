import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit {
  constructor(
    public service: PaymentDetailService
  ) { }

  ngOnInit(): void {}

  onSubmit(form: NgForm){
    if(this.service.formData.PMId==0){
      this.insertRecord(form)
    }else{
      this.updateRecord(form)
    }
  }

  insertRecord(form: NgForm){
    this.service.postPaymentDetail().subscribe((res)=>{
      this.resetForm(form);
      this.service.refreshList();
      console.log(res);
    });
  }
  //------
  updateRecord(form:NgForm){
    this.service.putPaymentDetail().subscribe((res)=>{
      this.resetForm(form);
      this.service.refreshList();
      console.log(res);
    })
  }
  //------
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }

}
