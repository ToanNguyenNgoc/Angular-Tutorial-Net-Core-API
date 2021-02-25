import { Component, OnInit } from '@angular/core';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styleUrls: ['./payment-detail-list.component.scss']
})
export class PaymentDetailListComponent implements OnInit {
  public paymentDetail: PaymentDetail[]=[];
  public NameSearch:any

  constructor( public service: PaymentDetailService) { }

  ngOnInit(): void {
   this.service.refreshList();
  }
  populateForm(selectedRecord: PaymentDetail){
    this.service.formData= Object.assign({}, selectedRecord);
  }
  onDelete(id : number){
    this.service.deletePaymentDetail(id).subscribe((res)=>{
      this.service.refreshList();
    })
  }
  //Searching
  Searching(){
    if(this.NameSearch ==''){
      this.service.refreshList();
    }else{
      this.paymentDetail= this.paymentDetail.filter((data)=>{
        return data.CardOwnerName.toLocaleLowerCase().match(this.NameSearch.toLocaleLowerCase());
      })
    }
  }
}
