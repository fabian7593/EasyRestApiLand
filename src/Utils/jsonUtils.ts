// The json files
const messages = require('../../json/messages.json');
const regexes = require('../../json/regex.json');
const statusResponseList = require('../../json/statusResponse.json');
const errorDbList = require('../../json/errorDBList.json');

//Class and Objects imported
import ErrorMessage from "../Objects/ErrorMessageObject";
import StatusResponseObject from "../Objects/StatusResponseObject";
import RegexObject from "../Objects/RegexObject";


/*
  Json Utils class use all information of the files in the json folder
*/

// Get the message of json file message
export function getMessage(key : string): string {
  const message = messages[key];

  // if key entry doesnt exist
  if (!message) {
    return `Message Missed : ${key}`;
  }

  return message;
}

//Get Regex Object
export function getRegex(title : string): RegexObject {
  const regex = regexes[title];
  return regex as RegexObject;
}

//Get Status Response Object
export function getStatus(title: string): StatusResponseObject {
  const status  = statusResponseList[title];
  return status as StatusResponseObject;
}


//Get error of the DB with the SQL State
export function getErrorDBbySqlState(errorMessage: string): ErrorMessage | null {

    const erroNoMatch = errorMessage.match(/no: (\w+)/);
    let errno;
    
    if (erroNoMatch) {
        errno = erroNoMatch[1];
    } else {
        return null;
    }

    const errors: ErrorMessage[] = errorDbList;
    const error = errors.find(error => error.errno === errno);
    
    if (error) {
        return error;
    } else {
        return null;
    }
}


//Get Error DB by No
export function getErrorDBbyNo(errorNo: string): ErrorMessage | null {
  const errors: ErrorMessage[] = errorDbList;
  const error = errors.find(error => error.errno === errorNo);
  
  if (error) {
      return error;
  } else {
      return null;
  }
}