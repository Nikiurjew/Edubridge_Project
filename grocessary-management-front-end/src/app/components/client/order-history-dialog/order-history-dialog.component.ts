import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../../model/order.model';
import { Product } from '../../model/product.model';


@Component({
  selector: 'app-order-history-dialog',
  templateUrl: './order-history-dialog.component.html',
  styleUrls: ['./order-history-dialog.component.scss']
})
export class OrderHistoryDialogComponent {
  order: Order | undefined;
  product: Array<Product> = [];
  constructor(
    //In constructor argument pass component class name i.e OrderHistoryDialogComponent
    public dialogRef: MatDialogRef<OrderHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    console.log('$$$$$$$$$$$$', data);
    if (!!data && data?.orderId) {
      this.order = data;
      if (this.order?.product && this.order?.product.length > 0) {
        this.product = this.order?.product;
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
