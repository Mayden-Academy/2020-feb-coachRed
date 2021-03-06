import * as React from "react"

export interface DropdownProperties {
    fieldName: string, 
    label: string,
    updateParent: React.SetStateAction<any> | ((fieldData: string | number) => void) 
    options: Array<string>
}
export interface DropdownState {
    dropdownVisible: boolean,
    fieldData: string,

}

export class Dropdown extends React.Component<DropdownProperties, DropdownState> {

    constructor(props: any) {
        super(props)
        this.state = {
            dropdownVisible: false,
            fieldData: this.props.options[0],
         
        }
    }

    render() {
        return (
            <div className="dropdownContainer">
                <label htmlFor={this.props.fieldName}>{this.props.label}</label>
                <div id={this.props.fieldName} className="dropdown">
                    <div className="selectedItem btn btn-danger dropdown-toggle" 
                    onClick={(e) => this.showDropDownItems(e)}>
                        {this.state.fieldData}
                    </div>
                    {this.state.dropdownVisible && <div className="dropdownItems">
                        {this.props.options.map((option) =>{
                            return (
                                <div className="dropdownItem" 
                                key={this.props.options.findIndex((entry)=>entry===option)} 
                                onClick={(e) => this.changeOption(e, option)}>
                                    {option}
                                </div>
                            )
                        })}
                    </div>}
                </div>
            </div>
        )
    }

    changeOption(e: React.MouseEvent, toOption : string) : void {
        e.preventDefault()
        this.setState({
            dropdownVisible: false,
            fieldData: toOption
        })
        this.props.updateParent(toOption)
    }

    showDropDownItems(e: React.MouseEvent) : void {
        e.preventDefault()
        let dropdownToggle = !(this.state.dropdownVisible)
        this.setState({
            dropdownVisible: dropdownToggle
        })
    }
}
