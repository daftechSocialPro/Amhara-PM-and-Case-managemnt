import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private hubConnection: signalR.HubConnection;
  private notificationSubject = new Subject<any>();
  private notificationHub = environment.baseUrl +"/notificationHub"


  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.notificationHub) // Replace with your API URL
      .build();

    this.hubConnection.start().catch((error) => console.error(error));

    this.hubConnection.on('ReceiveNotification', (data) => {
      this.notificationSubject.next(data);
    });
  }

  getNotifications() {
    return this.notificationSubject.asObservable();
  }
}
