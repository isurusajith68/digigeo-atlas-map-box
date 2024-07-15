"use client";
import "ol/ol.css";
import {
  createBox,
  createRegularPolygon,
  GeometryFunction,
} from "ol/interaction/Draw";
import OlSourceVector from "ol/source/Vector";
import Polygon from "ol/geom/Polygon";
import { Geometry } from "ol/geom";
import { Map } from "@react-ol/fiber";
import { useState } from "react";

export function useGeometryFunction(shapeType) {
  if (["None", "Circle"].includes(shapeType)) {
    return;
  }
  if (shapeType === "Square") {
    return createRegularPolygon(4);
  }
  if (shapeType === "Box") {
    return createBox();
  }
  if (shapeType === "Star") {
    return (coordinates, geometry) => {
      const center = coordinates[0];
      const last = coordinates[1];
      const dx = center[0] - last[0];
      const dy = center[1] - last[1];
      const radius = Math.sqrt(dx * dx + dy * dy);
      const rotation = Math.atan2(dy, dx);
      const newCoordinates = [];
      const numPoints = 12;
      for (let i = 0; i < numPoints; i += 1) {
        const angle = rotation + (i * 2 * Math.PI) / numPoints;
        const fraction = i % 2 === 0 ? 1 : 0.5;
        const offsetX = radius * fraction * Math.cos(angle);
        const offsetY = radius * fraction * Math.sin(angle);
        newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
      }
      newCoordinates.push(newCoordinates[0].slice());
      if (!geometry) {
        geometry = new Polygon([newCoordinates]);
      } else {
        geometry.setCoordinates([newCoordinates]);
      }
      return geometry;
    };
  }
}


const DrawShapes = () => {
  const [shapeType, setShapeType] = useState("Box");
  const geometryFunction = useGeometryFunction(shapeType);
  const [vectorSource, setVectorSource] = useState();
  return (
    <>
      <olLayerVector>
        <olSourceVector ref={setVectorSource} />
      </olLayerVector>
      {vectorSource ? (
        <olInteractionDraw
          args={{
            source: vectorSource,
            type: "Circle",
            geometryFunction,
          }}
        />
      ) : null}
    </>
  );
};
export default DrawShapes;
