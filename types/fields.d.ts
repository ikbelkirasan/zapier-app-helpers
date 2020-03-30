type FieldType =
  | "string"
  | "text"
  | "password"
  | "integer"
  | "number"
  | "boolean"
  | "file"
  | "datetime"
  | "copy";

export interface InputField {
  /**
   * A unique machine readable key for this value (IE: “fname”).
   */
  key: string;
  /**
   * A human readable label for this value (IE: “First Name”).
   */
  label?: string;
  /**
   * If this value is required or not.
   */
  required?: boolean;
  /**
   * The type of this value.
   */
  type?: FieldType;
  /**
   * A human readable description of this value (IE: “The first part of a full name.”). You can use Markdown.
   */
  helpText?: string;
  /**
   * Does the value of this field affect the definitions of other fields in the set?
   */
  altersDynamicFields?: boolean;
  /**
   * A reference to a trigger that will power a dynamic dropdown.
   */
  dynamic?: string;
  /**
   * A reference to a search that will guide the user to add a search step to populate this field when creating a Zap.
   */
  search?: string;
  /**
   * An object of machine keys and human values to populate a static dropdown.
   */
  choices?:
    | {
        [key: string]: string | number;
      }
    | string[];
  /**
   * An array of child fields that define the structure of a sub-object for this field. Usually used for line items.
   */
  children?: InputField[];
  /**
   * An example value that is not saved.
   */
  placeholder?: string;
  /**
   * A default value that is saved the first time a Zap is created.
   */
  default?: string;
  /**
   * Can a user provide multiples of this field?
   */
  list?: boolean;
  /**
   * Is this field a key/value input?
   */
  dict?: boolean;
  /**
   * Is this field automatically populated (and hidden from the user)?
   */
  computed?: boolean;
  /**
   * Useful when you expect the input to be part of a longer string. Put `"{{input}}"` in place of the user’s input (IE: `"https://{{input}}.yourdomain.com"`).
   */
  inputFormat?: string;
}

export interface OutputField {
  /**
   * Field identifier
   */
  key: string;
  /**
   * Field label
   */
  label?: string;
  /**
   * Field type
   */
  type?: FieldType;
}
