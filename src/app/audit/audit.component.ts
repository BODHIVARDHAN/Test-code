import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Audit } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit
{
    audits = [];
    page: number = 1;
    pagelen: number;
    limit: number = 25;
    totalCount: number;
    firstpage = 1;
    pageResultCount: [25, 50, 100];
    user: any;
    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService
    )
    {
    }

    ngOnInit()
    {
        this.loadAllAudits();
    }

    private loadAllAudits()
    {
        this.auditService.getAll()
            .pipe(first())
            .subscribe(audits => {
                // let temp = [];
                this.totalCount = (audits.length/10);
                setTimeout(() => {
                    this.audits = audits;
                }, 2000);
                console.log('totalCount',typeof(this.totalCount))
                // this.audits.forEach(element => {
                //         temp.push(element)
                // });
                console.log('audits',this.audits);
            });
    }
    search(){
        if(this.user = ''){
            this.loadAllAudits();
        }else{
            this.audits = this.audits.filter(res => {
                return res.user.toLocaleLowerCase().match(this.user.toLocaleLowerCase)
            })
        }
    }
}