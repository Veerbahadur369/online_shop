class apiErrorHandling extends Error{
    constructor(status,message="process failled") {
        super(message)
        this.status=status
        this.message=message
        this.data=null

    }
}

export { apiErrorHandling};