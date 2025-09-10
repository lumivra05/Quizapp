import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
tests =[];

constructor(private notification: NzNotificationService,
  private testService: AdminService
){}

ngOnInit(){
  this.getAllTests();
}

getAllTests(){
  this.testService.getAllTest().subscribe(res=>{
    this.tests= res;

  }, error=>{
    this.notification
    .error(
      'ERROR',
      `Something Went Wrong.Try Again`,
      { nzDuration:5000}
    )
  })
}

getFormattedTime(time): string{
const minutes = Math.floor(time/60);
const seconds = time % 60;
return `${minutes} minutes ${seconds} seconds`;
}

deleteTest(testId: number): void {
    if (confirm("Are you sure you want to delete this test?")) {
      this.testService.deleteTest(testId).subscribe(
        () => {
          this.notification.success('Deleted', 'Test deleted successfully');
          this.getAllTests(); // refresh test list
        },
        error => {
          this.notification.error('Error', 'Failed to delete test');
        }
      );
    }
  }
}
