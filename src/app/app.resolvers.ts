import { inject } from '@angular/core';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { MessagesService } from '@shared/layout/common/messages/messages.service';
import { NotificationsService } from '@shared/layout/common/notifications/notifications.service';
import { ShortcutsService } from '@shared/layout/common/shortcuts/shortcuts.service';
import { forkJoin } from 'rxjs';

export const initialDataResolver = () =>
{
    const messagesService = inject(MessagesService);
    const navigationService = inject(NavigationService);
    const notificationsService = inject(NotificationsService);
    const shortcutsService = inject(ShortcutsService);

    // Fork join multiple API endpoint calls to wait all of them to finish
    return   navigationService.get();
    // forkJoin([
        // messagesService.getAll(),
        // notificationsService.getAll(),
        // quickChatService.getChats(),
        // shortcutsService.getAll(),
    // ]);
};
