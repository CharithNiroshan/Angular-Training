import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})

export class SearchBarComponent {
  public searchValue: string = "";
  public isDisabled: boolean = false;

  constructor(private router: Router, private dataService: DataService) {
  }

  onSubmit(form: NgForm) {
    this.dataService.updateData(this.searchValue);
    this.router.navigate(["search", form.value.search]);
  }

  onChange(text: string) {
    this.searchValue = text;
  }
}

