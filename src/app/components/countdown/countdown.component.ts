import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { EventsApp } from '../../services/events.service';

@Component({
    
    selector: 'app-countdown',
    // template: '{{ displayTime }}',
    templateUrl: './countdown.component.html',
    styleUrls: ['./countdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownComponent implements OnDestroy {
    private _time: number;
    private _timing = 1000;
    private _interval;
    private _item: [];

    @Input()
    public set time(value: number) {
        this._time = value;
        this._startTimer();
    }

    @Input()
    public set timing(value: number) {
        this._timing = value;
        this._startTimer();
    }

    @Input()
    public set item(value: any) {
        this._item = value;
        console.log(this._item);
    }
    


    @Input()
    public format = '{dd} days {hh} hours {mm} minutes {ss} seconds';

    public get delta() {
        let date = new Date();
        return Math.max(0, Math.floor((this._time - date.getTime()) / 1000));
    }

    public get displayTime() {
        let days, hours, minutes, seconds, delta = this.delta, time = this.format;

        days = Math.floor(delta / 86400);
        delta -= days * 86400;
        hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        seconds = delta % 60;

        // time = time.replace('{dd}', days);
        // time = time.replace('{hh}', hours);
        // time = time.replace('{mm}', minutes);
        // time = time.replace('{ss}', seconds);

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }

    constructor(
        private _changeDetector: ChangeDetectorRef,
        private evetnsApp: EventsApp
        ) { }

    ngOnDestroy() {
        this._stopTimer();
    }

    private _startTimer() {
        if (this.delta <= 0) {
            return;
        }
        this._stopTimer();
        this._interval = setInterval(() => {
            this._changeDetector.detectChanges();
            if (this.delta <= 0) {
                this._stopTimer();
                this.evetnsApp.eventoTiempo(this._item);
                console.log(this._item)
            }
        }, this._timing);
    }

    private _stopTimer() {
        clearInterval(this._interval);
        this._interval = undefined;
        
    }
}
