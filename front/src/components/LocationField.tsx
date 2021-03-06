import * as React from "react"
import { Location } from '../interfaces/Location'

export interface LocationFieldProps {updateParent(newLoc: Location): void, fieldData: Location | null}

export class LocationField extends React.Component<LocationFieldProps, {}> {
    constructor(props: any){
        super(props)
        this.state = {}
        this.getLocation = this.getLocation.bind(this)
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            let longLat: Location = {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            }
            this.props.updateParent(longLat)
        })
    }

    render() {
        if (this.props.fieldData) {
            return (
                <div className="locationField">
                    {/* <label htmlFor="locationField">Location:</label> */}
                    {/* <p>{this.props.fieldData.latitude}, {this.props.fieldData.longitude}</p> */}
                    <button onClick={this.getLocation} className="btn">
                    </button>
                </div>
            )
        }
        return (
        <div className="locationField">
            {/* <label htmlFor="locationField">Location:</label>
            <p></p> */}
            <button onClick={this.getLocation} className="btn">
            </button>
        </div>)
    }
}