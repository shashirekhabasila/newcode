export class agent {
    fromuserid: any;
    touserid: any;
    propertyid: any;

}

export class tenantnotifications {
    id: any
    propertyid: string
    fromuserid: string
    touserid: any;
    message: string
    notifydate: Date
    status: string
    notificationtype: string
}

export class owneraddagent {
    propertyid: any
    agentuserid: string
    status: string;
}