import ApiCalendar from 'react-google-calendar-api';
import { Action, Dispatch } from 'redux';	
import { UserEvent } from '../store/reducers/userSlice';

interface RespOk {
	access_token: string,
	expires_in: number,
	scope: string,
	token_type: string
}

interface RespErr {
	error: string,
	error_description: string,
	error_codes: Array<number>,
	timestamp: string,
	trace_id: string,
	correlation_id: string
}

const config = {
	clientId: "626710636251-5g916rvn2vnipsj7qntqjqdmvuc6hojd.apps.googleusercontent.com",
	apiKey: "AIzaSyA-qC9VwOtm23UMoHHDKZ3zy5hE2X7FoSg",
	scope: "https://www.googleapis.com/auth/calendar.readonly",
	discoveryDocs: [
	  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
	],
};

class CalendarService extends ApiCalendar {
	
	listUpcomingEvents = async () : Promise<gapi.client.calendar.Event[] | undefined> => {
		let response;
		try {
		  const request = {
			'calendarId': 'primary',
			'timeMin': (new Date()).toISOString(),
			'showDeleted': false,
			'singleEvents': true,
			'maxResults': 3,
			'orderBy': 'startTime',
			};		
			response = await gapi.client.calendar.events.list(request);
			return response.result.items;
		} catch (err) {
		  console.log(err);				  
		  return;
		}		
	  }

	handleClickAuth = (
		dispatch: Dispatch,
		setEvents: (arg: Array<UserEvent | undefined>) => Action,
		signIn: () => Action,
		setSnackOpen: (arg: boolean) => Action
	) => {
		
	if (gapi && this.tokenClient) {
			// export function getToken(): GoogleApiOAuth2TokenObject;			
			// export function setToken(token: TokenObject|null): void;
		this.tokenClient.callback = async (resp: RespErr | RespOk) => {
				if ('error' in resp && resp.error !== undefined) {
					throw (resp);
				}
				console.log(resp);
			const events = await this.listUpcomingEvents();
			if (events && (events.length !== 0) && events[0]) {
				const eventList = events.map(({ summary, start }
					: gapi.client.calendar.Event): UserEvent | undefined => {
					if (summary && start && start.dateTime) {
							return {
							date: start.dateTime.slice(0, 10),
							time: start.dateTime.slice(11, 16),
							summary
						}
					} return undefined
				})
				eventList && dispatch(setEvents(eventList))
				dispatch(signIn())
				dispatch(setSnackOpen(true))
			}
		};  
		
		if (gapi.client.getToken() === null) {
		 this.tokenClient.requestAccessToken({ prompt: 'consent' });			  
		} else {
		 this.tokenClient.requestAccessToken({ prompt: '' });
		}
  } else {
    console.error("Error: this.gapi not loaded");
    new Error("Error: this.gapi not loaded");
  }
	}	
}

export default new CalendarService(config)


