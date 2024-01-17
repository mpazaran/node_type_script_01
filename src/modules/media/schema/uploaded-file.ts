import mongoose, {Document, Schema} from 'mongoose';

export enum FileAccess {
    PUBLIC  = 'public',
    PRIVATE = 'private'
}

export enum FileStatus {
    DELETED = 'DELETED',
    VISIBLE = 'VISIBLE',
    HIDE    = 'HIDE'
}

export interface UploadedFileInterface {
    filePath: string;
    originalName: string;
    mimeType: string;
    uploader?: mongoose.Types.ObjectId;
    expirationDate: Date;
    accessControl: FileAccess;
    allowedUsers: mongoose.Types.ObjectId[];
    status: FileStatus;
    label: string
}

const UploadedFileSchema: Schema = new Schema<UploadedFileInterface>({
    filePath      : {
        type    : String,
        required: true
    },
    originalName  : {
        type    : String,
        required: true
    },
    mimeType      : {
        type    : String,
        required: true
    },
    uploader      : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    expirationDate: {
        type    : Date,
        required: true
    },
    accessControl : {
        type   : String,
        enum   : FileAccess,
        default: FileAccess.PRIVATE
    },
    allowedUsers  : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    status        : {
        type   : String,
        enum   : FileStatus,
        default: FileStatus.VISIBLE
    },
    label         : {
        type: String
    },
});

export {UploadedFileSchema}

const UploadedFile = mongoose.model('uploaded_file', UploadedFileSchema);

export default UploadedFile;
