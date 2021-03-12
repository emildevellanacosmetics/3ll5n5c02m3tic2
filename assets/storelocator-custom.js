/**
 * @extends storeLocator.StaticDataFeed
 * @constructor
 */
function MedicareDataSource() {
  $.extend(this, new storeLocator.StaticDataFeed);

  var that = this;
  
  $.get('/pages/store-locator-data', function(data) {
    var jsonData = $(data).find('#StoreJSON').html();
    that.setStores(that.parse_(jsonData));
  });
}

/**
 * @const
 * @type {!storeLocator.FeatureSet}
 * @private
 */


/**
 * @return {!storeLocator.FeatureSet}
 */
MedicareDataSource.prototype.getFeatures = function() {
  return this.FEATURES_;
};
/**
 * @private
 * @param {string} csv
 * @return {!Array.<!storeLocator.Store>}
 */
MedicareDataSource.prototype.parse_ = function(csv) {
  var stores = [];
  var storesCSV = JSON.parse(csv);
  for(var i = 0; i < storesCSV.stores.length; i++)
  {
    var features = new storeLocator.FeatureSet;
    
    var storeData = storesCSV.stores[i];
    //console.log(storeData.Fcilty_nam);
    var position = new google.maps.LatLng(storeData.Ycoord, storeData.Xcoord);
    var locality = this.join_([storeData.Locality], '<br>');
    
    var store = new storeLocator.Store(storeData.uuid, position, features, {
      title: storeData.Fcilty_nam,
      address: this.join_([storeData.Street_add, locality], '<br>')
    });
    stores.push(store);
  }
  return stores;
  
  
};

/**
 * Joins elements of an array that are non-empty and non-null.
 * @private
 * @param {!Array} arr array of elements to join.
 * @param {string} sep the separator.
 * @return {string}
 */
MedicareDataSource.prototype.join_ = function(arr, sep) {
  var parts = [];
  for (var i = 0, ii = arr.length; i < ii; i++) {
    arr[i] && parts.push(arr[i]);
  }
  return parts.join(sep);
};

/**
 * Very rudimentary CSV parsing - we know how this particular CSV is formatted.
 * IMPORTANT: Don't use this for general CSV parsing!
 * @private
 * @param {string} row
 * @return {Array.<string>}
 */
MedicareDataSource.prototype.parseRow_ = function(row) {
  // Strip leading quote.
  if (row.charAt(0) == '"') {
    row = row.substring(1);
  }
  // Strip trailing quote. There seems to be a character between the last quote
  // and the line ending, hence 2 instead of 1.
  if (row.charAt(row.length - 2) == '"') {
    row = row.substring(0, row.length - 2);
  }

  row = row.split('","');

  return row;
};

/**
 * Creates an object mapping headings to row elements.
 * @private
 * @param {Array.<string>} headings
 * @param {Array.<string>} row
 * @return {Object}
 */
MedicareDataSource.prototype.toObject_ = function(headings, row) {
  var result = {};
  for (var i = 0, ii = row.length; i < ii; i++) {
    result[headings[i]] = row[i];
  }
  return result;

};
