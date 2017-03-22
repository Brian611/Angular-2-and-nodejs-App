import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { IContact } from '../../classes/icontact';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: IContact[];
  contactForm: FormGroup;

  constructor(private contServ: ContactsService, public fb: FormBuilder) {
    this.contactForm = fb.group({
      name: ['brian', Validators.required],
      surname: ['pooe', Validators.required],
      cellNo: ['0786452611', Validators.required]
    });
  }

  ngOnInit() {
    this.getAllContacts()
  }

  getAllContacts() {
    return this.contServ.getAllContacts()
      .subscribe(contact => {
        this.contacts = contact;
      },
      error => console.log());
  }

  addContact($event) {
    $event.preventDefault();
    //console.log(this.contactForm.value);
    this.contServ.addContact(this.contactForm.value)
      .subscribe(contact => {
        this.getAllContacts();
      },
      error => (console.log(error)),
      () => this.contactForm.reset());
  }
  editContact(id) {
    console.log(id);
  }
}
