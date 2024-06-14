import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';

import {Trip} from'../data/trips';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css'],
})

export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  trip!:Trip;
  submitted = false;
  message : string='';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit() {

    let tripCode = localStorage.getItem("tripCode");

    if (!tripCode) {
      alert("Something wrong, couldn’t find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log('tripcode:' + tripCode);

    this.editForm = this.formBuilder.group ({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    })
  
  this.tripDataService.getTrip(tripCode).subscribe({
    next:(value: any) =>{
      this.editForm.patchValue(value[0]);
      if(!value){
        this.message = 'no trip retrieved!';
      }
      else{
        this.message = 'Trip: ' + tripCode + 'retrieved';
      }
      console.log(this.message);
    },
    error: (error: any) => {
      console.log('Error:' + error);
    }
  })
}

  public onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
    }
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }
}