/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./defined-2a4f2d00","./Check-e5651467","./Math-7782f09e","./Cartesian2-ba70b51f","./Transforms-7d72c08c","./GeometryAttribute-75811f09"],function(t,m,n,b,O,a,G){"use strict";var p=Math.cos,v=Math.sin,x=Math.sqrt,r={computePosition:function(t,n,a,r,e,o,s){var i=n.radiiSquared,g=t.nwCorner,h=t.boundingRectangle,u=g.latitude-t.granYCos*r+e*t.granXSin,c=p(u),C=v(u),l=i.z*C,d=g.longitude+r*t.granYSin+e*t.granXCos,S=c*p(d),w=c*v(d),M=i.x*S,f=i.y*w,X=x(M*S+f*w+l*C);if(o.x=M/X,o.y=f/X,o.z=l/X,a){var Y=t.stNwCorner;m.defined(Y)?(u=Y.latitude-t.stGranYCos*r+e*t.stGranXSin,d=Y.longitude+r*t.stGranYSin+e*t.stGranXCos,s.x=(d-t.stWest)*t.lonScalar,s.y=(u-t.stSouth)*t.latScalar):(s.x=(d-h.west)*t.lonScalar,s.y=(u-h.south)*t.latScalar)}}},R=new G.Matrix2,y=new O.Cartesian3,P=new O.Cartographic,W=new O.Cartesian3,_=new a.GeographicProjection;function T(t,n,a,r,e,o,s){var i=Math.cos(n),g=r*i,h=a*i,u=Math.sin(n),c=r*u,C=a*u;y=_.project(t,y),y=O.Cartesian3.subtract(y,W,y);var l=G.Matrix2.fromRotation(n,R);y=G.Matrix2.multiplyByVector(l,y,y),y=O.Cartesian3.add(y,W,y),--o,--s;var d=(t=_.unproject(y,t)).latitude,S=d+o*C,w=d-g*s,M=d-g*s+o*C,f=Math.max(d,S,w,M),X=Math.min(d,S,w,M),Y=t.longitude,m=Y+o*h,p=Y+s*c,v=Y+s*c+o*h;return{north:f,south:X,east:Math.max(Y,m,p,v),west:Math.min(Y,m,p,v),granYCos:g,granYSin:c,granXCos:h,granXSin:C,nwCorner:t}}r.computeOptions=function(t,n,a,r,e,o,s){var i,g,h,u,c,C=t.east,l=t.west,d=t.north,S=t.south,w=!1,M=!1;d===b.CesiumMath.PI_OVER_TWO&&(w=!0),S===-b.CesiumMath.PI_OVER_TWO&&(M=!0);var f=d-S;h=(c=C<l?b.CesiumMath.TWO_PI-l+C:C-l)/((i=Math.ceil(c/n)+1)-1),u=f/((g=Math.ceil(f/n)+1)-1);var X=O.Rectangle.northwest(t,o),Y=O.Rectangle.center(t,P);0===a&&0===r||(Y.longitude<X.longitude&&(Y.longitude+=b.CesiumMath.TWO_PI),W=_.project(Y,W));var m=u,p=h,v=O.Rectangle.clone(t,e),G={granYCos:m,granYSin:0,granXCos:p,granXSin:0,nwCorner:X,boundingRectangle:v,width:i,height:g,northCap:w,southCap:M};if(0!==a){var x=T(X,a,h,u,0,i,g);d=x.north,S=x.south,C=x.east,l=x.west,G.granYCos=x.granYCos,G.granYSin=x.granYSin,G.granXCos=x.granXCos,G.granXSin=x.granXSin,v.north=d,v.south=S,v.east=C,v.west=l}if(0!==r){a-=r;var R=O.Rectangle.northwest(v,s),y=T(R,a,h,u,0,i,g);G.stGranYCos=y.granYCos,G.stGranXCos=y.granXCos,G.stGranYSin=y.granYSin,G.stGranXSin=y.granXSin,G.stNwCorner=R,G.stWest=y.west,G.stSouth=y.south}return G},t.RectangleGeometryLibrary=r});
