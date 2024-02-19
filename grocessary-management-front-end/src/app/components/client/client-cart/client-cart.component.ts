import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, take } from 'rxjs';
import { Cart } from '../../model/cart.model';
import { GrocessaryService } from '../../service/grocessary.service';
import * as _ from "lodash";
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-client-cart',
  templateUrl: './client-cart.component.html',
  styleUrls: ['./client-cart.component.css']
})
export class ClientCartComponent implements OnInit {
  cartList: Cart[] = [];
  cartListBackup: Cart[] = [];
  grandTotal: number = 0;
  customer: any = {};


  constructor(
    private gService: GrocessaryService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.gService.isClientLoginPresent();
    this.getCartList();
    this.getCustomerDetail();
  }

  ngOnInit(): void {
  }
  getCartList(): void {
    this.gService.cartList().pipe(take(1)).subscribe(
      (res: any) => {
        console.log("********", res);
        if (!!res && Array.isArray(res)) {
          const customerFilter = res.filter((item: Cart)=> item?.customer?.customerId === parseInt(this.gService.getClientAuthorization()));
          console.log("customer filter::::::",customerFilter);
          this.cartList = customerFilter;
          this.cartListBackup =  _.cloneDeep(customerFilter);
          if (this.cartList.length > 0) {
            this.cartList.map((item: Cart) => {
              this.grandTotal += (item?.mrpPrice * item?.quantity);
            })
          }
        }
      }, err => {
        console.log("error");
      }

    );
  }
  getTotal(quantity: number = 0, mrpPrice: number = 0): number {
    return quantity * mrpPrice;
  }
  placeOrder(): void {
    let totalPrice: number = 0;
    const deleteCartReq:any[]=[];
    const productItems: Array<Product> = [];
    this.cartList.forEach((item: Cart) => {
      productItems.push(item?.product);
      totalPrice += (item?.mrpPrice * item?.quantity);
      deleteCartReq.push(this.gService.deleteCart(item?.cartId));
    });
    console.log('>>>>>>>>', totalPrice)
    const body: any = {
      totalPrice: totalPrice,
      orderStatus: "success",
      paymentStatus: "success",
      orderedDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      customer: this.customer,
      productname: 'xxxxx',
      image: 'xxxxx',
      product: productItems
    };
    this.gService.placeOrderItem(this.customer?.customerId, body).pipe(take(1)).subscribe((res: any) => {
      console.log('>>>>>>>', res);
      forkJoin(deleteCartReq).pipe(take(1)).subscribe();
      alert("Place order Sucessfully");
      this.router.navigate(["/client/order"]);
    })
    


  }

  getCustomerDetail(): void {
    const cid = this.gService.getClientAuthorization();
    this.gService.getCustomerById(cid).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("Customer*****", res);
        if (!!res && res?.customerId) {
          this.customer = res;
        }
      }, err => {
        console.log("Err");
      }
    )
  }

  deleteCart(cart:Cart, showAlert: boolean = true):void{
    this.gService.deleteCart(cart?.cartId).pipe(take(1)).subscribe(
      (res: any) => {
        if (showAlert) {
          alert("Product deleted sucessfully");
        }
       
        this.getCartList();
      }, err => {
        console.log("Err");
      }
    )
  }

  onIncreaseQunatity(cart: Cart): void {
    const index = this.cartList.findIndex((item: Cart) => item.cartId === cart?.cartId);
    // const bac = Object.assign(this.cartListBackup);
    const indexBackup = this.cartListBackup.findIndex((item: Cart) => item.cartId === cart?.cartId);
    const qty = cart.quantity + 1;
    console.log( this.cartListBackup[indexBackup].quantity , '>>>>>>' , (cart.product?.quantity ))
    if (qty > (cart.product?.quantity  + this.cartListBackup[indexBackup].quantity) ) {
      alert('Added quantity should not greater than avaiable quantity');
      return;
    }
    this.cartList[index].quantity = qty;
    this.updateGrantTotal();
  }

  onDecreaseQunatity(cart: Cart): void {
    const index = this.cartList.findIndex((item: Cart) => item.cartId === cart?.cartId);
    const qty = cart.quantity - 1;
    if (qty === 0) {
      this.deleteCart(cart, false);
    }
    this.cartList[index].quantity = qty;
    this.updateGrantTotal();
  }

  updateGrantTotal(): void {
    let total = 0;
    this.cartList.map((item: Cart) => {
      total+= (item?.mrpPrice * item?.quantity);
     
    })
    this.grandTotal = total;
  }

}
