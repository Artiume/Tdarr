import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { GlobalSettingsDB } from '../api/tasks.js';
import ClipLoader from 'react-spinners/ClipLoader';
import ToggleButton from 'react-toggle-button';


var ButtonStyle = {
  display: 'inline-block',
}

const borderRadiusStyle = { borderRadius: 2 }

class App extends Component {

  constructor(props) {
    super(props);

  }


  handleChange = (event) => {


    var value = event.target.value

    if (event.target.name == "basePath") {



      if (value.charAt(0) !== "/") {

        value = "/" + value

      }

    }


    GlobalSettingsDB.upsert(

      "globalsettings",
      {
        $set: {
          [event.target.name]: value,
        }
      }
    );


  }



  renderOptions = () => {


    var settings = this.props.globalSettings


    if (settings.length == 0) {

      return <center style={ButtonStyle}><ClipLoader

        sizeUnit={"px"}
        size={10}
        color={'white'}
        loading={true}
        style={ButtonStyle}
      /></center>

    } else {

      settings = settings[0]
      return <div>
        <p>Base URL (e.g. /base )</p>
        <input type="text" className="folderPaths" name="basePath" defaultValue={settings != undefined && settings.basePath != undefined ? settings.basePath : ""} onChange={this.handleChange}></input>

        <br />
        <br />
        <br />

        <span className="buttonTextSize mr-2" style={ButtonStyle}>Linux FFmpeg NVENC binary (3.4.5 for unRAID compatibility):</span>

        <div style={ButtonStyle}>
          <ToggleButton
            style={ButtonStyle}
            thumbStyle={borderRadiusStyle}
            trackStyle={borderRadiusStyle}
            value={settings.ffmpegNVENCBinary} onToggle={() => {

              GlobalSettingsDB.upsert('globalsettings',
                {
                  $set: {
                    ffmpegNVENCBinary: !settings.ffmpegNVENCBinary,
                  }
                }
              );
            }
            } />
        </div>

        <br />
        <br />
        <br />

        <span className="buttonTextSize mr-2" style={ButtonStyle}>Auto-cancel stalled workers:</span>

        <div style={ButtonStyle}>
          <ToggleButton
            style={ButtonStyle}
            thumbStyle={borderRadiusStyle}
            trackStyle={borderRadiusStyle}
            value={settings.workerStallDetector} onToggle={() => {

              GlobalSettingsDB.upsert('globalsettings',
                {
                  $set: {
                    workerStallDetector: !settings.workerStallDetector,
                  }
                }
              );
            }
            } />
        </div>

        <br />
        <br />
        <br />
          <p>Backup limit (default 30): </p>
         
           <input type="text" className="folderPaths" name="backupLimit" defaultValue={settings != undefined && settings.backupLimit != undefined ? settings.backupLimit : "30"} onChange={this.handleChange}></input>


      </div>




    }
  }

  render() {



    return (





      <div className="containerGeneral">

        <br /><br />


        <div className="tabWrap" >

          <div className="optionsDiv">

            {this.renderOptions()}



          </div>


        </div>



      </div>

    );
  }
}

export default withTracker(() => {

  Meteor.subscribe('GlobalSettingsDB');


  return {
    globalSettings: GlobalSettingsDB.find({}, {}).fetch(),

  };
})(App);


