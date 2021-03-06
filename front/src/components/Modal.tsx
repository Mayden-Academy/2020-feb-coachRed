import React, { Component } from 'react'
import { TextInput } from './TextInput'
import { Dropdown } from './Dropdown'
import { Submit } from './Submit';

export interface ModalState {
 startTime: string,
 endTime: string,
 repeat: string,
 hourlyRate: number,
 ageGroup: string,
 date: string
}

export interface ModalProps {
  date : Date,
  toggleModal(): void
}

export default class Modal extends Component<ModalProps, ModalState>{
  constructor(props: any) {
    super(props);
    this.state = {
      date : this.props.date.toISOString().split('T')[0],
      startTime: '',
      endTime: '',
      repeat: 'Once',
      hourlyRate: 0,
      ageGroup: 'Under 18s'
    };
  }

  updateStartTime = (slotStartTime: string) => {
    this.setState({startTime: slotStartTime })
  }

  updateEndTime = (slotEndTime: string) => {
    this.setState({endTime: slotEndTime })
  }

  repeat = (newRepeat: string) => {
    this.setState({repeat: newRepeat})
  }

  ageGroup = (newAgeGroup: string) => {
    this.setState({ageGroup: newAgeGroup})
  }

  hourlyRate = (newRate: number) => {
    this.setState({hourlyRate: newRate})
  }

  addSlot = () => {
    fetch('http://localhost:3000/slot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(localStorage.getItem('coachRedToken'))
      },
      body: JSON.stringify(this.state)
    }).then((response) => {
      return response.json()
    }).then((response) => {
      if(response.status === 'fail'){
        localStorage.setItem('coachRedToken', response.data.token)
        alert('please fill out slot details correctly')
      } else {
        localStorage.setItem('coachRedToken', response.data.token)
        this.props.toggleModal()
      }
    })
  }


  render() {
    return (
      <div className="modal" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">New Time slot for {this.props.date.toLocaleDateString()}</h5>
              <button type="button" className="close" onClick={this.props.toggleModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body form">
              <TextInput label='Start Time' fieldName='startTime' fieldData={this.state.startTime} inputType='time' isRequired={true} updateParent={this.updateStartTime} />
              <TextInput label='End Time' fieldName='endTime' fieldData={this.state.endTime} inputType='time' isRequired={true} updateParent={this.updateEndTime} />
              <Dropdown label='Repeat?' fieldName='repeat' updateParent={this.repeat} options={['Once', 'Weekly', 'Fortnightly', 'Monthly']} />
              <Dropdown label='Age Group?' fieldName='age' updateParent={this.ageGroup} options={['Under 18s', 'Adults']} />
              <TextInput label='Hourly Rate (£)' fieldName="hourlyRate" fieldData={this.state.hourlyRate} inputType='number' isRequired={true} updateParent={this.hourlyRate} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={this.props.toggleModal}>Close</button>
              <Submit sendResults={this.addSlot} buttonName='Add Slot' />
            </div>
          </div>
        </div>
      </div> 
    )
  }
}
