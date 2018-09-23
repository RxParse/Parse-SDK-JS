declare namespace Parse {

    let applicationId: string;
    let javaScriptKey: string | undefined;
    let masterKey: string | undefined;
    let serverURL: string;
    let liveQueryServerURL: string;
    let VERSION: string;

    interface RequestOptions {
        useMasterKey?: boolean;
        sessionToken?: string;
        installationId?: string;
        include?: any;
    };


    interface SuccessOption {
        success?: Function;
    }

    interface ErrorOption {
        error?: Function;
    }

    interface SuccessErrorOptions extends SuccessOption, ErrorOption {
    }

    interface SignUpOptions {
        useMasterKey?: boolean;
        installationId?: string;
    }

    interface SessionTokenOption {
        sessionToken?: string;
    }

    interface WaitOption {
        /**
         * Set to true to wait for the server to confirm success
         * before triggering an event.
         */
        wait?: boolean;
    }

    interface UseMasterKeyOption {
        /**
         * In Cloud Code and Node only, causes the Master Key to be used for this request.
         */
        useMasterKey?: boolean;
    }

    interface InstallationOptions {
        installationId?: string;
    }

    interface ScopeOptions extends SessionTokenOption, UseMasterKeyOption {
    }

    interface FullOptions extends SuccessErrorOptions, SessionTokenOption, UseMasterKeyOption, InstallationOptions {

    };

    interface FileSaveOptions extends SuccessErrorOptions, UseMasterKeyOption {

    }

    interface FileUrlOptions {
        forceSecure?: boolean;
    }

    interface SilentOption {
        /**
         * Set to true to avoid firing the event.
         */
        silent?: boolean;
    }

    interface Pointer {
        __type: string;
        className: string;
        objectId: string;
    }

    interface IBaseObject {
        toJSON(): any;
    }

    class BaseObject implements IBaseObject {
        toJSON(): any;
    }

    /**
     * Call this method first to set up your authentication tokens for Parse.
     * You can get your keys from the Data Browser on parse.com.
     * @param {String} applicationId Your Parse Application ID.
     * @param {String} javaScriptKey (optional) Your Parse JavaScript Key (Not needed for parse-server)
     * @param {String} masterKey (optional) Your Parse Master Key. (Node.js only!)
     */
    function initialize(applicationId: string, javaScriptKey?: string, masterKey?: string): void;

    function setAsyncStorage(storage: any): void;

    /**
     * Creates a new ACL.
     * If no argument is given, the ACL has no permissions for anyone.
     * If the argument is a Parse.User, the ACL will have read and write
     *   permission for only that user.
     * If the argument is any other JSON object, that object will be interpretted
     *   as a serialized ACL created with toJSON().
     * @see Parse.Object#setACL
     * @class
     *
     * <p>An ACL, or Access Control List can be added to any
     * <code>Parse.Object</code> to restrict access to only a subset of users
     * of your application.</p>
     */
    class ACL extends BaseObject {

        permissionsById: any;

        constructor(arg1?: any);
        equals(other: ACL): boolean;

        setPublicReadAccess(allowed: boolean): void;
        getPublicReadAccess(): boolean;

        setPublicWriteAccess(allowed: boolean): void;
        getPublicWriteAccess(): boolean;

        setReadAccess(userId: User | string, allowed: boolean): void;
        getReadAccess(userId: User | string): boolean;

        setRoleReadAccess(role: Role | string, allowed: boolean): void;
        getRoleReadAccess(role: Role | string): boolean;

        setRoleWriteAccess(role: Role | string, allowed: boolean): void;
        getRoleWriteAccess(role: Role | string): boolean;

        setWriteAccess(userId: User | string, allowed: boolean): void;
        getWriteAccess(userId: User | string): boolean;
    }


    /**
     * Parse.Analytics provides an interface to Parse's logging and analytics backend.
     * @class
     */
    namespace Analytics {

        /**
        *Tracks the occurrence of a custom event with additional dimensions. Parse will store a data point at the time of invocation with the given event name.
        *Dimensions will allow segmentation of the occurrences of this custom event. Keys and values should be {@code String}s, and will throw otherwise.
        *To track a user signup along with additional metadata, consider the following:
        *var dimensions = {
        *    gender: 'm',
        *   source: 'web',
        *   dayType: 'weekend'
        *};
        *Parse.Analytics.track('signup', dimensions);
        *There is a default limit of 8 dimensions per event tracked.
         *
         * @param {string} name
         * @param {*} dimensions
         * @returns {Promise<any>}
         */
        function track(name: string, dimensions: any): Promise<any>;
    }

    /**
     * @namespace Contains functions for calling and declaring
     * <a href="/docs/cloud_code_guide#functions">cloud functions</a>.
     * <p><strong><em>
     *   Some functions are only available from Cloud Code.
     * </em></strong></p>
     */
    namespace Cloud {

        interface CookieOptions {
            domain?: string;
            expires?: Date;
            httpOnly?: boolean;
            maxAge?: number;
            path?: string;
            secure?: boolean;
        }

        interface HttpResponse {
            buffer?: Buffer;
            cookies?: any;
            data?: any;
            headers?: any;
            status?: number;
            text?: string;
        }

        interface JobRequest {
            params: any;
        }

        interface JobStatus {
            error?: (response: any) => void;
            message?: (response: any) => void;
            success?: (response: any) => void;
        }

        interface FunctionRequest {
            installationId?: String;
            master?: boolean;
            params?: any;
            user?: User;
        }

        interface FunctionResponse {
            success: (response: any) => void;
            error(code: number, response: any): void;
            error(response: any): void;
        }

        interface Cookie {
            name?: string;
            options?: CookieOptions;
            value?: string;
        }

        interface TriggerRequest {
            installationId?: String;
            master?: boolean;
            user?: User;
            ip: string;
            headers: any;
            triggerName: string;
            log: any;
            object: Object;
            original?: Parse.Object;
        }

        interface AfterSaveRequest extends TriggerRequest { }
        interface AfterDeleteRequest extends TriggerRequest { }
        interface BeforeDeleteRequest extends TriggerRequest { }
        interface BeforeDeleteResponse extends FunctionResponse { }
        interface BeforeSaveRequest extends TriggerRequest { }
        interface BeforeSaveResponse extends FunctionResponse {
            success: () => void;
        }

        // Read preference describes how MongoDB driver route read operations to the members of a replica set.
        enum ReadPreferenceOption {
            Primary = 'PRIMARY',
            PrimaryPreferred = 'PRIMARY_PREFERRED',
            Secondary = 'SECONDARY',
            SecondaryPreferred = 'SECONDARY_PREFERRED',
            Nearest = 'NEAREST'
        }

        interface BeforeFindRequest extends TriggerRequest {
            query: Query
            count: boolean
            isGet: boolean
            readPreference?: ReadPreferenceOption
        }

        interface AfterFindRequest extends TriggerRequest {
            objects: Object[]
        }

        interface AfterFindResponse extends FunctionResponse {
            success: (objects: Object[]) => void;
        }

        function afterDelete(arg1: any, func?: (request: AfterDeleteRequest) => void): void;
        function afterSave(arg1: any, func?: (request: AfterSaveRequest) => void): void;
        function beforeDelete(arg1: any, func?: (request: BeforeDeleteRequest, response: BeforeDeleteResponse) => void): void;
        function beforeSave(arg1: any, func?: (request: BeforeSaveRequest, response: BeforeSaveResponse) => void): void;
        function beforeFind(arg1: any, func?: (request: BeforeFindRequest) => void): void;
        function afterFind(arg1: any, func?: (request: AfterFindRequest, response: AfterFindResponse) => void): void;
        function define(name: string, func?: (request: FunctionRequest, response: FunctionResponse) => void): void;
        function httpRequest(options: HTTPOptions): Promise<HttpResponse>;
        function job(name: string, func?: (request: JobRequest, status: JobStatus) => void): HttpResponse;
        function run(name: string, data?: any, options?: RunOptions): Promise<any>;
        function useMasterKey(): void;

        interface RunOptions extends SuccessErrorOptions, ScopeOptions { }

        /**
         * To use this Cloud Module in Cloud Code, you must require 'buffer' in your JavaScript file.
         *
         *     import Buffer = require("buffer").Buffer;
         */
        let HTTPOptions: new () => HTTPOptions;
        interface HTTPOptions {
            /**
             * The body of the request.
             * If it is a JSON object, then the Content-Type set in the headers must be application/x-www-form-urlencoded or application/json.
             * You can also set this to a Buffer object to send raw bytes.
             * If you use a Buffer, you should also set the Content-Type header explicitly to describe what these bytes represent.
             */
            body?: string | Buffer | Object;
            /**
             * Defaults to 'false'.
             */
            followRedirects?: boolean;
            /**
             * The headers for the request.
             */
            headers?: {
                [headerName: string]: string | number | boolean;
            };
            /**
             *The method of the request (i.e GET, POST, etc).
             */
            method?: string;
            /**
             * The query portion of the url.
             */
            params?: any;
            /**
             * The url to send the request to.
             */
            url: string;

            success?: (response: any) => void;
            error?: (response: any) => void;
        }
    }

    /**
     * Parse.Config
     *
     * @class Config
     * @extends {Object}
     */
    class Config extends Object {
        static get(): Promise<Config>;
        static current(): Config;

        get(attr: string): any;
        escape(attr: string): any;
    }

    /**
     * Parse.Error
     *
     * @class Error
     */
    class Error {

        code: ErrorCode;
        message: string;

        /**
         * Constructs a new Parse.Error object with the given code and message.
         * @param {ErrorCode} code An error code constant from Parse.Error.
         * @param {string} message A detailed description of the error.
         * @memberof Error
         */
        constructor(code: ErrorCode, message: string);
    }

    /*
     * We need to inline the codes in order to make compilation work without this type definition as dependency.
     */
    const enum ErrorCode {

        OTHER_CAUSE = -1,
        INTERNAL_SERVER_ERROR = 1,
        CONNECTION_FAILED = 100,
        OBJECT_NOT_FOUND = 101,
        INVALID_QUERY = 102,
        INVALID_CLASS_NAME = 103,
        MISSING_OBJECT_ID = 104,
        INVALID_KEY_NAME = 105,
        INVALID_POINTER = 106,
        INVALID_JSON = 107,
        COMMAND_UNAVAILABLE = 108,
        NOT_INITIALIZED = 109,
        INCORRECT_TYPE = 111,
        INVALID_CHANNEL_NAME = 112,
        PUSH_MISCONFIGURED = 115,
        OBJECT_TOO_LARGE = 116,
        OPERATION_FORBIDDEN = 119,
        CACHE_MISS = 120,
        INVALID_NESTED_KEY = 121,
        INVALID_FILE_NAME = 122,
        INVALID_ACL = 123,
        TIMEOUT = 124,
        INVALID_EMAIL_ADDRESS = 125,
        MISSING_CONTENT_TYPE = 126,
        MISSING_CONTENT_LENGTH = 127,
        INVALID_CONTENT_LENGTH = 128,
        FILE_TOO_LARGE = 129,
        FILE_SAVE_ERROR = 130,
        DUPLICATE_VALUE = 137,
        INVALID_ROLE_NAME = 139,
        EXCEEDED_QUOTA = 140,
        SCRIPT_FAILED = 141,
        VALIDATION_ERROR = 142,
        INVALID_IMAGE_DATA = 150,
        UNSAVED_FILE_ERROR = 151,
        INVALID_PUSH_TIME_ERROR = 152,
        FILE_DELETE_ERROR = 153,
        REQUEST_LIMIT_EXCEEDED = 155,
        INVALID_EVENT_NAME = 160,
        USERNAME_MISSING = 200,
        PASSWORD_MISSING = 201,
        USERNAME_TAKEN = 202,
        EMAIL_TAKEN = 203,
        EMAIL_MISSING = 204,
        EMAIL_NOT_FOUND = 205,
        SESSION_MISSING = 206,
        MUST_CREATE_USER_THROUGH_SIGNUP = 207,
        ACCOUNT_ALREADY_LINKED = 208,
        INVALID_SESSION_TOKEN = 209,
        LINKED_ID_MISSING = 250,
        INVALID_LINKED_SESSION = 251,
        UNSUPPORTED_SERVICE = 252,
        AGGREGATE_ERROR = 600,
        FILE_READ_ERROR = 601,
        X_DOMAIN_REQUEST = 602
    }

    /**
     * Provides a set of utilities for using Parse with Facebook.
     * @namespace
     * Provides a set of utilities for using Parse with Facebook.
     */
    namespace FacebookUtils {

        function init(options?: any): void;
        function isLinked(user: User): boolean;
        function link(user: User, permissions: any, options?: SuccessErrorOptions): void;
        function logIn(permissions: any, options?: SuccessErrorOptions): void;
        function unlink(user: User, options?: SuccessErrorOptions): void;
    }

    /**
     * A Parse.File is a local representation of a file that is saved to the Parse cloud.
     * @class
     * @param name {String} The file's name. This will be prefixed by a unique
     *     value once the file has finished saving. The file name must begin with
     *     an alphanumeric character, and consist of alphanumeric characters,
     *     periods, spaces, underscores, or dashes.
     * @param data {Array} The data for the file, as either:
     *     1. an Array of byte value Numbers, or
     *     2. an Object like { base64: "..." } with a base64-encoded String.
     *     3. a File object selected with a file upload control. (3) only works
     *        in Firefox 3.6+, Safari 6.0.2+, Chrome 7+, and IE 10+.
     *        For example:<pre>
     * var fileUploadControl = $("#profilePhotoFileUpload")[0];
     * if (fileUploadControl.files.length > 0) {
     *   var file = fileUploadControl.files[0];
     *   var name = "photo.jpg";
     *   var parseFile = new Parse.File(name, file);
     *   parseFile.save().then(function() {
     *     // The file has been saved to Parse.
     *   }, function(error) {
     *     // The file either could not be read, or could not be saved to Parse.
     *   });
     * }</pre>
     * @param type {String} Optional Content-Type header to use for the file. If
     *     this is omitted, the content type will be inferred from the name's
     *     extension.
     */
    class File {

        constructor(name: string, data: any, type?: string);
        name(): string;
        url(options?: FileUrlOptions): string;
        save(options?: FileSaveOptions): Promise<File>;
    }

    /**
     * We expose three events to help you monitor the status of the WebSocket connection:
     * Open - When we establish the WebSocket connection to the LiveQuery server, you'll get this event.
     * Close - When we lose the WebSocket connection to the LiveQuery server, you'll get this event.
     * Error - When some network error or LiveQuery server error happens, you'll get this event.
     * @class LiveQuery
     */
    class LiveQuery {
        static on(eventName: string, callback: Function): void;
        static close(): void;
    }

    class LiveQuerySubscription extends EventEmitter {
        constructor(id: string, query: Query, sessionToken: string);
        unsubscribe(): void;
    }

    /**
     * Creates a new model with defined attributes. A client id (cid) is
     * automatically generated and assigned for you.
     *
     * <p>You won't normally call this method directly.  It is recommended that
     * you use a subclass of <code>Parse.Object</code> instead, created by calling
     * <code>extend</code>.</p>
     *
     * <p>However, if you don't want to use a subclass, or aren't sure which
     * subclass is appropriate, you can use this form:<pre>
     *     var object = new Parse.Object("ClassName");
     * </pre>
     * That is basically equivalent to:<pre>
     *     var MyClass = Parse.Object.extend("ClassName");
     *     var object = new MyClass();
     * </pre></p>
     *
     * @param {Object} attributes The initial set of data to store in the object.
     * @param {Object} options A set of Backbone-like options for creating the
     *     object.  The only option currently supported is "collection".
     * @see Parse.Object.extend
     *
     * @class
     *
     * <p>The fundamental unit of Parse data, which implements the Backbone Model
     * interface.</p>
     */
    class Object extends BaseObject {

        id: string;
        createdAt: Date;
        updatedAt: Date;
        attributes: any;
        cid: string;
        changed: boolean;
        className: string;

        constructor(className?: string, attributes?: any, options?: any);

        static _clearAllState(): void;

        static extend(className: string, protoProps?: any, classProps?: any): any;
        static fromJSON(json: any, override: boolean): any;

        static fetchAll<T extends Object>(list: T[], options: Object.FetchAllOptions): Promise<T[]>;
        static fetchAllIfNeeded<T extends Object>(list: T[], options: Object.FetchAllOptions): Promise<T[]>;
        static destroyAll<T>(list: T[], options?: Object.DestroyAllOptions): Promise<T[]>;
        static saveAll<T extends Object>(list: T[], options?: Object.SaveAllOptions): Promise<T[]>;
        static registerSubclass<T extends Object>(className: string, clazz: new (options?: any) => T): void;
        static createWithoutData<T extends Object>(id: string): T;

        initialize(): void;
        add(attr: string, item: any): this;
        addUnique(attr: string, item: any): any;
        change(options: any): this;
        changedAttributes(diff: any): boolean;
        clear(options: any): any;
        clone(): this;
        destroy(options?: Object.DestroyOptions): Promise<this>;
        dirty(attr?: string): boolean;
        dirtyKeys(): string[];
        escape(attr: string): string;
        existed(): boolean;
        fetch(options?: Object.FetchOptions): Promise<this>;
        get(attr: string): any | undefined;
        getACL(): ACL | undefined;
        has(attr: string): boolean;
        hasChanged(attr: string): boolean;
        increment(attr: string, amount?: number): any;
        isNew(): boolean;
        isValid(): boolean;
        op(attr: string): any;
        previous(attr: string): any;
        previousAttributes(): any;
        relation(attr: string): Relation<this, Object>;
        remove(attr: string, item: any): any;
        revert(): void;
        save(attrs?: { [key: string]: any } | null, options?: Object.SaveOptions): Promise<this>;
        save(key: string, value: any, options?: Object.SaveOptions): Promise<this>;
        save(attrs: object, options?: Object.SaveOptions): Promise<this>;
        set(key: string, value: any, options?: Object.SetOptions): boolean;
        set(attrs: object, options?: Object.SetOptions): boolean;
        setACL(acl: ACL, options?: SuccessErrorOptions): boolean;
        toPointer(): Pointer;
        unset(attr: string, options?: any): any;
        validate(attrs: any, options?: SuccessErrorOptions): boolean;
    }

    namespace Object {
        interface DestroyOptions extends SuccessErrorOptions, WaitOption, ScopeOptions { }

        interface DestroyAllOptions extends SuccessErrorOptions, ScopeOptions { }

        interface FetchAllOptions extends SuccessErrorOptions, ScopeOptions { }

        interface FetchOptions extends SuccessErrorOptions, ScopeOptions { }

        interface SaveOptions extends SuccessErrorOptions, SilentOption, ScopeOptions, WaitOption { }

        interface SaveAllOptions extends SuccessErrorOptions, ScopeOptions { }

        interface SetOptions extends ErrorOption, SilentOption {
            promise?: any;
        }
    }

    /**
     * Creates a new Polygon with any of the following forms:
     *new Polygon([[0,0],[0,1],[1,1],[1,0]])
     *new Polygon([GeoPoint, GeoPoint, GeoPoint])
     *  
     *Represents a coordinates that may be associated with a key in a ParseObject or used as a reference point for geo queries. This allows proximity-based queries on the key.
     *
     *Example:
     *
     *var polygon = new Parse.Polygon([[0,0],[0,1],[1,1],[1,0]]);
     *var object = new Parse.Object("PlaceObject");
     *object.set("area", polygon);
     *object.save();
     *
     * @class Polygon
     */
    class Polygon extends BaseObject {
        coordinates: Array;

        static _validate(coordinates: any);

        constructor(coordinates: Array<Array<number>> | Array<Parse.GeoPoint>);
        containsPoint(point: Parse.GeoPoint): boolean;
        equals(other: Polygon): boolean;
    }

    /**
     * Contains functions to deal with Push in Parse
     * @name Parse.Push
     * @namespace
     */
    namespace Push {
        function send<T>(data: PushData, options?: PushSendOptions): Promise<T>;

        interface PushData {
            channels?: string[];
            push_time?: Date;
            expiration_time?: Date;
            expiration_interval?: number;
            where?: Query<Installation>;
            data?: any;
            alert?: string;
            badge?: string;
            sound?: string;
            title?: string;
        }

        interface PushSendOptions extends SuccessErrorOptions, UseMasterKeyOption {

        }
    }

    /**
     * Creates a new parse Parse.Query for the given Parse.Object subclass.
     * @param objectClass -
     *   An instance of a subclass of Parse.Object, or a Parse className string.
     * @class
     *
     * <p>Parse.Query defines a query that is used to fetch Parse.Objects. The
     * most common use case is finding all objects that match a query through the
     * <code>find</code> method. For example, this sample code fetches all objects
     * of class <code>MyClass</code>. It calls a different function depending on
     * whether the fetch succeeded or not.
     *
     * <pre>
     * var query = new Parse.Query(MyClass);
     * query.find({
     *   success: function(results) {
     *     // results is an array of Parse.Object.
     *   },
     *
     *   error: function(error) {
     *     // error is an instance of Parse.Error.
     *   }
     * });</pre></p>
     *
     * <p>A Parse.Query can also be used to retrieve a single object whose id is
     * known, through the get method. For example, this sample code fetches an
     * object of class <code>MyClass</code> and id <code>myId</code>. It calls a
     * different function depending on whether the fetch succeeded or not.
     *
     * <pre>
     * var query = new Parse.Query(MyClass);
     * query.get(myId, {
     *   success: function(object) {
     *     // object is an instance of Parse.Object.
     *   },
     *
     *   error: function(object, error) {
     *     // error is an instance of Parse.Error.
     *   }
     * });</pre></p>
     *
     * <p>A Parse.Query can also be used to count the number of objects that match
     * the query without retrieving all of those objects. For example, this
     * sample code counts the number of objects of the class <code>MyClass</code>
     * <pre>
     * var query = new Parse.Query(MyClass);
     * query.count({
     *   success: function(number) {
     *     // There are number instances of MyClass.
     *   },
     *
     *   error: function(error) {
     *     // error is an instance of Parse.Error.
     *   }
     * });</pre></p>
     */
    class Query<T extends Object = Object> extends BaseObject {

        objectClass: any;
        className: string;

        constructor(objectClass: string | Parse.Object);

        static or<U extends Object>(...var_args: Query<U>[]): Query<U>;

        aggregate(pipeline: Query.AggregationOptions | Query.AggregationOptions[]): Query<T>;
        addAscending(key: string): Query<T>;
        addAscending(key: string[]): Query<T>;
        addDescending(key: string): Query<T>;
        addDescending(key: string[]): Query<T>;
        ascending(key: string): Query<T>;
        ascending(key: string[]): Query<T>;
        containedIn(key: string, values: any[]): Query<T>;
        contains(key: string, substring: string): Query<T>;
        containsAll(key: string, values: any[]): Query<T>;
        count(options?: Query.CountOptions): Promise<number>;
        descending(key: string): Query<T>;
        descending(key: string[]): Query<T>;
        doesNotExist(key: string): Query<T>;
        doesNotMatchKeyInQuery<U extends Object>(key: string, queryKey: string, query: Query<U>): Query<T>;
        doesNotMatchQuery<U extends Object>(key: string, query: Query<U>): Query<T>;
        distinct(key: string): Query<T>;
        each(callback: Function, options?: Query.EachOptions): Promise<void>;
        endsWith(key: string, suffix: string): Query<T>;
        equalTo(key: string, value: any): Query<T>;
        exists(key: string): Query<T>;
        find(options?: Query.FindOptions): Promise<T[]>;
        first(options?: Query.FirstOptions): Promise<T | undefined>;
        get(objectId: string, options?: Query.GetOptions): Promise<T>;
        greaterThan(key: string, value: any): Query<T>;
        greaterThanOrEqualTo(key: string, value: any): Query<T>;
        include(key: string): Query<T>;
        include(keys: string[]): Query<T>;
        lessThan(key: string, value: any): Query<T>;
        lessThanOrEqualTo(key: string, value: any): Query<T>;
        limit(n: number): Query<T>;
        matches(key: string, regex: RegExp, modifiers: any): Query<T>;
        matchesKeyInQuery<U extends Object>(key: string, queryKey: string, query: Query<U>): Query<T>;
        matchesQuery<U extends Object>(key: string, query: Query<U>): Query<T>;
        near(key: string, point: ParseGeoPoint): Query<T>;
        notContainedIn(key: string, values: any[]): Query<T>;
        notEqualTo(key: string, value: any): Query<T>;
        select(...keys: string[]): Query<T>;
        skip(n: number): Query<T>;
        startsWith(key: string, prefix: string): Query<T>;
        subscribe(): Events;
        withinGeoBox(key: string, southwest: ParseGeoPoint, northeast: ParseGeoPoint): Query<T>;
        withinKilometers(key: string, point: ParseGeoPoint, maxDistance: number): Query<T>;
        withinMiles(key: string, point: ParseGeoPoint, maxDistance: number): Query<T>;
        withinRadians(key: string, point: ParseGeoPoint, maxDistance: number): Query<T>;
        subscribe(): LiveQuerySubscription;
        polygonContains(key: string, point: ParseGeoPoint): Query<T>;
    }

    namespace Query {
        interface EachOptions extends SuccessErrorOptions, ScopeOptions { }
        interface CountOptions extends SuccessErrorOptions, ScopeOptions { }
        interface FindOptions extends SuccessErrorOptions, ScopeOptions { }
        interface FirstOptions extends SuccessErrorOptions, ScopeOptions { }
        interface GetOptions extends SuccessErrorOptions, ScopeOptions { }

        // According to http://docs.parseplatform.org/rest/guide/#aggregate-queries
        interface AggregationOptions {
            group?: { objectId?: string, [key: string]: any };
            match?: { [key: string]: any };
            project?: { [key: string]: any };
            limit?: number;
            skip?: number;
            // Sort documentation https://docs.mongodb.com/v3.2/reference/operator/aggregation/sort/#pipe._S_sort
            sort?: { [key: string]: 1 | -1 };
        }
    }

    /**
     * Creates a new GeoPoint with any of the following forms:<br>
     *   <pre>
     *   new GeoPoint(otherGeoPoint)
     *   new GeoPoint(30, 30)
     *   new GeoPoint([30, 30])
     *   new GeoPoint({latitude: 30, longitude: 30})
     *   new GeoPoint()  // defaults to (0, 0)
     *   </pre>
     * @class
     *
     * <p>Represents a latitude / longitude point that may be associated
     * with a key in a ParseObject or used as a reference point for geo queries.
     * This allows proximity-based queries on the key.</p>
     *
     * <p>Only one key in a class may contain a GeoPoint.</p>
     *
     * <p>Example:<pre>
     *   var point = new Parse.GeoPoint(30.0, -20.0);
     *   var object = new Parse.Object("PlaceObject");
     *   object.set("location", point);
     *   object.save();</pre></p>
     */
    class ParseGeoPoint extends BaseObject {

        latitude: number;
        longitude: number;

        constructor(options?: any, longitude?: number);

        current(options?: SuccessErrorOptions): ParseGeoPoint;
        radiansTo(point: ParseGeoPoint): number;
        kilometersTo(point: ParseGeoPoint): number;
        milesTo(point: ParseGeoPoint): number;
    }

    /**
     * A class that is used to access all of the children of a many-to-many relationship.
     * Each instance of Parse.Relation is associated with a particular parent object and key.
     */
    class Relation<S extends Object = Object, T extends Object = Object> extends BaseObject {

        parent: S;
        key: string;
        targetClassName: string;

        constructor(parent?: S, key?: string);

        //Adds a Parse.Object or an array of Parse.Objects to the relation.
        add(object: T | Array<T>): void;

        // Returns a Parse.Query that is limited to objects in this relation.
        query(): Query<T>;

        // Removes a Parse.Object or an array of Parse.Objects from this relation.
        remove(object: T | Array<T>): void;
    }

    /**
     * Represents a Role on the Parse server. Roles represent groupings of
     * Users for the purposes of granting permissions (e.g. specifying an ACL
     * for an Object). Roles are specified by their sets of child users and
     * child roles, all of which are granted any permissions that the parent
     * role has.
     *
     * <p>Roles must have a name (which cannot be changed after creation of the
     * role), and must specify an ACL.</p>
     * @class
     * A Parse.Role is a local representation of a role persisted to the Parse
     * cloud.
     */
    class Role extends Object {

        constructor(name: string, acl: ACL);

        getRoles(): Relation<Role, Role>;
        getUsers(): Relation<Role, User>;
        getName(): string;
        setName(name: string, options?: SuccessErrorOptions): any;
    }

    /**
     * A Parse.Schema object is for handling schema data from Parse.
     * All the schemas methods require MasterKey.
     * const schema = new Parse.Schema('MyClass');
     * schema.addString('field');
     * schema.addIndex('index_name', {'field', 1});
     * schema.save();
     *
     * @class Schema
     */
    class Schema {

        static all(options: FullOptions): Promise<Array<Schema>>;

        fields: { [key: string]: any };
        classLevelPermissions: { [key: string]: any };
        indexes: { [key: string]: any };
        constructor(name: string);

        addArray(name: string): Schema;
        addBoolean(name: string): Schema;
        addDate(name: string): Schema;
        /**
         *
         *
         * @param {string} name Name of the field that will be created on Parse
         * @param {string} type TheCan be a (String|Number|Boolean|Date|Parse.File|Parse.GeoPoint|Array|Object|Pointer|Parse.Relation)
         * @returns {Schema}
         * @memberof Schema
         */
        addField(name: string, type: string): Schema;
        addFile(name: string): Schema;
        addGeoPoint(name: string): Schema;
        addIndex(name: string): Schema;
        addNumber(name: string): Schema;
        addObject(name: string): Schema;
        addPointer(name: string): Schema;
        addPolygon(name: string): Schema;
        addRelation(name: string, targetClass: string): Schema;
        addString(name: string): Schema;
        delete(options: FullOptions): Promise<Schema>;
        get(options: FullOptions): Promise<Schema>;
        purge(): Promise<Array>;
        save(options: FullOptions): Promise<Schema>;
        update(options: FullOptions): Promise<Schema>;
    }

    class Session extends Object {
        static current(): Promise<Session>;

        getSessionToken(): string;
        isCurrentSessionRevocable(): boolean;
    }

    /**
     * @class
     *
     * <p>A Parse.User object is a local representation of a user persisted to the
     * Parse cloud. This class is a subclass of a Parse.Object, and retains the
     * same functionality of a Parse.Object, but also extends it with various
     * user specific methods, like authentication, signing up, and validation of
     * uniqueness.</p>
     */
    class User extends Object {

        static current(): User | undefined;
        static signUp(username: string, password: string, attrs: any, options?: SignUpOptions): Promise<User>;
        static logIn(username: string, password: string, options?: SuccessErrorOptions): Promise<User>;
        static logOut(): Promise<User>;
        static allowCustomUserClass(isAllowed: boolean): void;
        static become(sessionToken: string, options?: SuccessErrorOptions): Promise<User>;
        static requestPasswordReset(email: string, options?: SuccessErrorOptions): Promise<User>;
        static extend(protoProps?: any, classProps?: any): any;

        signUp(attrs: any, options?: SignUpOptions): Promise<this>;
        logIn(options?: SuccessErrorOptions): Promise<this>;
        authenticated(): boolean;
        isCurrent(): boolean;

        getEmail(): string | undefined;
        setEmail(email: string, options?: SuccessErrorOptions): boolean;

        getUsername(): string | undefined;
        setUsername(username: string, options?: SuccessErrorOptions): boolean;

        setPassword(password: string, options?: SuccessErrorOptions): boolean;
        getSessionToken(): string;
    }

    /**
     * @class
     * A Parse.Op is an atomic operation that can be applied to a field in a
     * Parse.Object. For example, calling <code>object.set("foo", "bar")</code>
     * is an example of a Parse.Op.Set. Calling <code>object.unset("foo")</code>
     * is a Parse.Op.Unset. These operations are stored in a Parse.Object and
     * sent to the server as part of <code>object.save()</code> operations.
     * Instances of Parse.Op should be immutable.
     *
     * You should not create subclasses of Parse.Op or instantiate Parse.Op
     * directly.
     */
    namespace Op {

        interface BaseOperation extends IBaseObject {
            objects(): any[];
        }

        interface Add extends BaseOperation {
        }

        interface AddUnique extends BaseOperation {
        }

        interface Increment extends IBaseObject {
            amount: number;
        }

        interface Relation extends IBaseObject {
            added(): Object[];
            removed: Object[];
        }

        interface Set extends IBaseObject {
            value(): any;
        }

        interface Unset extends IBaseObject {
        }
    }

    /**
     * Every Parse application installed on a device registered for
     * push notifications has an associated Installation object.
     */
    class Installation extends Object {

        badge: any;
        channels: string[];
        timeZone: any;
        deviceType: string;
        pushType: string;
        installationId: string;
        deviceToken: string;
        channelUris: string;
        appName: string;
        appVersion: string;
        parseVersion: string;
        appIdentifier: string;
    }
}

declare module "parse/node" {
    export = Parse;
}

declare module "parse" {
    import * as parse from "parse/node";
    export = parse
}
