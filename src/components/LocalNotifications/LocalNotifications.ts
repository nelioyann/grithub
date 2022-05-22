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

    public testSchedule = async () => {
        const options: ScheduleOptions = {
            notifications: [
                {
                    title: 'First notification',
                    body: 'This is the first notification',
                    id: 1,
                    schedule: { at: new Date(Date.now() + 5000) }
                },
                {
                    title: 'Second notification',
                    body: 'This is the second notification',
                    id: 2,
                    schedule: { at: new Date(Date.now() + 10000) }
                }
            ]
        };
        await LocalNotifications.schedule(options);
    }
    public isAccessGranted = async () => {
        const { display } = await LocalNotifications.checkPermissions();
        return display === 'granted';
    };

    /**
     *  Request permission to show notifications
     * @returns {Promise<void>}
     */
    public requestAccess = async () => {
        if (!(await this.isAccessGranted())) return;
        await LocalNotifications.requestPermissions();
    };

    public schedule = async (hour: number, minute: number) => {
        try {
            if (!(await this.isAccessGranted())) return;
            await LocalNotifications.schedule(
                {
                    notifications: [{
                        title: "Grithub",
                        body: "Daily scheduled Notifications",
                        schedule: {
                            on: {
                                hour,
                                minute
                            },
                        },
                        id: 1,
                    }]
                }
            );
    
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