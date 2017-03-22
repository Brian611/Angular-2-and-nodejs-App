import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { IContact } from '../../classes/icontact';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contactParams: IContact;

  constructor(private router: Router, private activatedRouter: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(params => {
      this.contactParams = JSON.parse(JSON.stringify(params));
    });
  }

}
