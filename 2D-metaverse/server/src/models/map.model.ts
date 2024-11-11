import mongoose, {Schema} from "mongoose";


export interface MapElement{
    _id: mongoose.ObjectId,
    mapId: mongoose.ObjectId,
    elementId: mongoose.ObjectId,
    x: number,
    y: number,
}

const mapElementSchema: Schema<MapElement> = new Schema({
    mapId: {
        type: Schema.Types.ObjectId,
        ref: "Map",
        required: true,
    },
    elementId: {
        type: Schema.Types.ObjectId,
        ref: 'Element',
        required: true
    },
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
});

export interface Map{
    _id: mongoose.ObjectId,
    width: number,
    height: number,
    name: string,
    thumbnail: string,
    mapElements: MapElement[]
}

const mapSchema: Schema<Map> = new Schema({
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    name: {
        type: String, 
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    mapElements: [
        {
            type: Schema.Types.ObjectId,
            ref: "MapElement",
        }
    ]
}, { timestamps: true });


export const MapElement = mongoose.model("MapElement", mapElementSchema)
export const Map = mongoose.model("Map", mapSchema);