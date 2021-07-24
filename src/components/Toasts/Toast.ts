export async function toast(message: string, duration = 3000){
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.color = 'primary';
    toast.position = 'bottom';
    toast.duration = duration;
    document.body.appendChild(toast);
    return toast.present();
}