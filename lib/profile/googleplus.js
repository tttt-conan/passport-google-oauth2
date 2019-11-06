/**
 * Parse profile.
 *
 * Parses user profiles as fetched from Google's Google+ API.
 *
 * The amount of detail in the profile varies based on the scopes granted by the
 * user.  The following scope values add additional data:
 *
 *     `https://www.googleapis.com/auth/plus.login` - recommended login scope
 *     `profile` - basic profile information
 *     `email` - email address
 *
 * References:
 *   - https://developers.google.com/+/web/api/rest/latest/people/get
 *   - https://developers.google.com/+/web/api/rest/
 *   - https://developers.google.com/+/web/api/rest/oauth
 *
 * @param {object|string} json
 * @return {object}
 * @access public
 */
exports.parse = function(json) {
  if ("string" == typeof json) {
    json = JSON.parse(json);
  }

  var profile = {},
    i,
    len;
  profile.id = (json.resourceName || "").split("/")[1] || "";
  if (json.names && json.names.length) {
    var name = json.names[0];
    profile.displayName = name.displayName;
    profile.name = name;
  }
  if (json.emailAddresses && json.emailAddresses.length) {
    profile.emails = json.emailAddresses;
  }
  if (json.photos && json.photos.length) {
    profile.photos = json.photos.map(p => ({ value: p.url }));
  }
  profile.gender = (json.genders[0] || {}).value || "";

  return profile;
};
