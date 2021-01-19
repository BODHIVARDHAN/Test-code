﻿import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    users = [];
    page: number = 1;
    pagelen: number;
    totalCount: number;
    username: any = '';

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,

    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => {
                this.totalCount = (users.length/10);
                this.users = users
            });
    }
    search(text){
        console.log('text',text);
        if(text == ''){
            this.loadAllUsers();
        }else{           
            this.users = this.users.filter(res => {
                return res.username.toLowerCase().match(text.toLowerCase())
            })
        }
    }   
    
}