# FormBBCS

Note that there are two versions of this repo

## v1

v1 has the backend hosted on fly.io, with the frontend being hosted on cloudflare. It is regularly updated using the script, and in the event of any errors, fixed, then updated again with the script

The backend could run with 1x cpu and 512mb

## v2

v2 has both frontend and backend hosted on Azure, and therefore may require more compute to run. Having frontend on Azure allows for the meta information to work when links are pasted in whatsapp, discord, etc. We are using 2C 4G, and have it to scale to 2 instances when needed, but it may be a bit overkill

### How to run

1. Create azure environment
 - email, app container
2. create an image by running the action
 - make sure you modify some values to your own, like image name and whatnot
3. try to run the app container with the docker image

### Files changed and why

**Backend**
- Removed "attached pdf" text as pdf is no longer generated on server side, and instead on lamda. We dont use aws

**Frontend**
- All mostly just name changes so it is more branded for buildingblocs
- features/admin-form: this is to enable charts feature to try it out