import { Component, OnInit } from '@angular/core';
import { HotToastService, ToastOptions } from '@ngneat/hot-toast';
import { from } from 'rxjs';
import { share } from 'rxjs/operators';

import { version } from '../../../package.json';
import { REPO_URL } from '../core/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title = 'toast';

  iconList = ['☝', '👇'];

  iconComponent = IconComponent;

  msgComponent = MessageComponent;

  REPO_URL = REPO_URL;

  version = version;

  constructor(private toastService: HotToastService) {}

  blank(message: string, options?: ToastOptions) {
    this.toastService.show(message, options);
  }
  error(message: string, options?: ToastOptions) {
    this.toastService.error(message, options);
  }
  success(message: string, options?: ToastOptions) {
    this.toastService.success(message, options);
  }
  loading() {
    this.toastService.loading('Loading...');
  }
  observe() {
    const promise = new Promise((res, rej) => {
      if (Math.random() < 0.85) {
        setTimeout(res, 2000);
      } else {
        setTimeout(rej, 2000);
      }
    });
    const observable = from(promise);
    const shared = observable.pipe(share());
    const toastRef = this.toastService.observe(shared, {
      loading: 'Preparing toast',
      error: 'Whoops, it burnt',
      next: "Here's your toast",
    });
  }
}

@Component({
  selector: 'app-icon',
  template: '✋',
})
export class IconComponent {}
@Component({
  selector: 'app-msg',
  template: 'Hey, how are you?',
})
export class MessageComponent {}
