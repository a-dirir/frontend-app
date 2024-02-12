import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './website/sidebar/sidebar.component';
import { ContentComponent } from './website/content/content.component';
import { PolicyComponent } from './pages/admin/authorization/policy/policy.component';

import { DynamicFormComponent } from './components/form/dynamic-form/dynamic-form.component';
import { DynamicFieldsComponent } from './components/form/dynamic-fields/dynamic-fields.component';
import { DynamicFieldTextComponent } from './components/form/dynamic-field-text/dynamic-field-text.component';



import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import {MatDialogModule, MatDialogConfig} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSidenavModule} from '@angular/material/sidenav';

import { ReactiveFormsModule } from '@angular/forms';
import { NgJsonEditorModule } from 'ang-jsoneditor' 

import { FlexLayoutModule } from '@angular/flex-layout';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HighlightModule } from 'ngx-highlightjs';

import { NavigatorService } from './services/navigator.service';
import { RequestService } from './services/request.service';
import { GroupComponent } from './pages/admin/authorization/group/group.component';
import { UserComponent } from './pages/admin/authorization/user/user.component';
import { ApiKeysComponent } from './pages/admin/authorization/api-keys/api-keys.component';
import { TableComponent } from './components/table/table.component';
import { NotificationsComponent } from './pages/app/monitoring/Templates/notifications/notifications.component';
import { JsonViewerComponent } from './components/json-viewer/json-viewer.component';
import { ProductsComponent } from './pages/app/assets/products/products.component';
import { UsageComponent } from './pages/app/assets/usage/usage.component';
import { ResourcesComponent } from './pages/app/assets/resources/resources.component';
import { AlarmsComponent } from './pages/app/monitoring/templates/alarms/alarms.component';

@NgModule({
  declarations: [
    //main website components
    AppComponent,
    SidebarComponent,
    ContentComponent,

    //reusable components
    TableComponent,
    DynamicFormComponent,
    DynamicFieldsComponent,
    DynamicFieldTextComponent,

    //admin pages components
    PolicyComponent,
    GroupComponent,
    UserComponent,
    ApiKeysComponent,
    NotificationsComponent,
    JsonViewerComponent,
    ProductsComponent,
    UsageComponent,
    ResourcesComponent,
    AlarmsComponent
  
  ],
  imports: [
    //angular modules
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    //material modules
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSelectModule,
    MatNativeDateModule,
    MatListModule,
    MatTabsModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSidenavModule,

    //other modules
    ReactiveFormsModule,
    FlexLayoutModule,
    NgJsonEditorModule,
    HighlightModule
  ],
  providers: [
    NavigatorService,
    RequestService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        lineNumbers: true,
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
        themePath: 'node_modules/highlight.js/styles/atom-one-dark.css',
        languages: {
          json: () => import('highlight.js/lib/languages/json'),
          asciidoc: () => import('highlight.js/lib/languages/asciidoc'),
        },
      },
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

