using System;
using System.Collections.Generic;

namespace ClassRepo
{
    public class CoordinatesContainer
    {
        public List<Coordinates> Coordinates { get; set; }
        public double MinusInt { get; set; }
        public double MaxRadius { get; set; }
        public int MaxDiameter { get; set; }
        public double CameraPosition { get; set; }
    }
}