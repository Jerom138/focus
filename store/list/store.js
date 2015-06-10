var CoreStore = require('../CoreStore');
var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher');
var keys = require('lodash/object/keys');
var intersection = require('lodash/array/intersection');
var capitalize = require('lodash/string/capitalize');
var isPlainObject = require('lodash/lang/isPlainObject');

/**
 * Store to manage paginated list.
 */
class ListStore extends CoreStore {
  /**
   * Constructor.
   * @param {object} conf - store configuration
   */
  constructor(conf){
    super(conf);
  }

  /**
   * Build the definition managed by the store.
   */
  buildDefinition(){
    var def = {
      list: 'list',
      pageInfos: 'pageInfos'
    }
    this.definition = this.config.definition
    for(var node in this.definition){
      if (isPlainObject(this.definition[node])){
        this.definition[node] = assign(this.definition[node], def);
      }else{
        this.definition[node] = def;
      }
    }
  }

  /**
   *
   * @param {string} key - name of the list in the store
   * @param {object} newData -
   */
  update(key, newData, status){
    var previousData = this.data.toJS()[key];
    var processedData = assign({}, previousData, newData);

    if(this._isSamePaginationContext(previousData, newData)){
      var key = keys(previousData.map)[0];
      processedData.list = previousData.list.concat(newData.list);
    }

    //add calculated fields on data
    if (processedData.pageInfos.totalRecords && processedData.pageInfos.perPage && processedData.pageInfos.perPage != 0) {
      processedData.pageInfos.totalPages = Math.ceil(processedData.pageInfos.totalRecords / processedData.pageInfos.perPage);
      // Check if the last page has been fetched, if yes, send an info to the console
      if (processedData.pageInfos.totalPages === processedData.pageInfos.currentPage) {
        console.info(`List store reached last page (page ${processedData.pageInfos.currentPage}) for a total of ${processedData.pageInfos.totalRecords} records.`);
      }
    }

    this[`update${capitalize(node)}`](processedData, status);
  }

  /**
   * Check if the search need to concat the nexData with the previous data (infinite scrol case).
   */
  _isSamePaginationContext(previousData, newData) {
    if(newData.pageInfos) {
      return newData.pageInfos.currentPage != 1 && isEqual(keys(previousData.map), keys(newData.map));
    }
    return false;
  }

  /**
   * The store registrer itself on the dispatcher.
   */
  registerDispatcher(){
    var currentStore = this;
    this.dispatch = AppDispatcher.register(function(transferInfo){
      //Read data from the action transfer information.
      var rawData = transferInfo.action.data;
      var status = transferInfo.action.status || {};
      var type = transferInfo.action.type;

      for(var node in rawData){
        var defKeys = keys(currentStore.definition[node]);
        var dataKeys = keys(node);
        var intersectKeys = intersection(defKeys, dataKeys);

        if(intersectKeys.length > 0) {
          currentStore.update(node, rawData[node], status);
        }else{
          console.warn(`Incomplete list store ${type} received. Got [${dataKeys.join(',')}], expected [${defKeys.join(',')}].`);
        }
      }
    });
  }
}

module.exports = ListStore;