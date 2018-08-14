import React, { Component } from 'react'

export default class Downloads extends Component {
    constructor() {
        super()

        this.state = {
            downloads: []
        }
    }

    render() {
        return(
            <div className="downloads_container">
                Downloads
            </div>
        )
    }
}