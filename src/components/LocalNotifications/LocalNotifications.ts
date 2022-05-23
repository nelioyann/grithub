import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';


class Notifications{
    constructor(){
        this.initialize();
    }

    initialize(){
        LocalNotifications.addListener('localNotificationReceived', (notification) => {
            console.log('Notification received: ', notification);
        });
    }

    // public testSchedule = async () => {
    //     const options: ScheduleOptions = {
    //         notifications: [
    //             {
    //                 title: 'First notification',
    //                 body: 'This is the first notification',
    //                 id: 12,
    //                 schedule: { at: new Date(Date.now() + 5000) }
    //             },
    //             {
    //                 title: 'Second notification',
    //                 body: 'This is the second notification',
    //                 id: 23,
    //                 schedule: { at: new Date(Date.now() + 10000) }
    //             }
    //         ]
    //     };
    //     const result = await LocalNotifications.schedule(options);
    //     console.log('Scheduled notifications: ', result);
    // }
    public isAccessGranted = async () => {
        const { display } = await LocalNotifications.checkPermissions();
        return display === 'granted';
    };

    /**
     *  Request permission to show notifications
     * @returns {Promise<void>}
     */
    public requestAccess = async () => {
        if ((await this.isAccessGranted())) {
            console.log('Permission already granted');
            return;
        };
        await LocalNotifications.requestPermissions();
    };

    public schedule = async (hour: number = 8, minute: number = 0) => {
        try {
            //Request/ check permissions
            if ( !((await LocalNotifications.requestPermissions()).display === 'granted') ) return;
            
            // Clear old notifications in prep for refresh 
            const pending = await LocalNotifications.getPending();
            if (pending.notifications.length > 0) {
                await LocalNotifications.cancel(pending);
            }

            const result = await LocalNotifications.schedule(
                {
                    notifications: [{
                        title: "Grithub",
                        body: "Daily reminder to check your habits",
                        schedule: {
                            // on: {
                            //     hour,
                            //     minute
                            // },
                            every: "minute",
                            count: 10
                        },
                        id: new Date().getTime(),
                    }]
                }
            );
            console.log('Scheduled notifications result: ', result);
    
        } catch (e) {
            console.log(e);
        }
    }; 

    public getPending = async () => {
        const pending = await LocalNotifications.getPending();
        console.log('Pending Notifications: ', pending);
    }
}

/**
 * 
 * @returns isAccessGranted: boolean
 */
export const isAccessGranted = async () => {
    const { display } = await LocalNotifications.checkPermissions();
    return display === 'granted';
};

export default new Notifications();