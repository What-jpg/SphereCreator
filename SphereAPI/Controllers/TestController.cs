using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ClassRepo;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Drawing;

namespace CancellationTestApi.Controllers
{
    [ApiController]
    [Route("[controller]/api")]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> _logger;

        public TestController(ILogger<TestController> logger)
        {
            _logger = logger;
        }

        [HttpGet("tab1/{qual:int}/{diam:int}")]
        public async Task<IActionResult> GetDataForTab1(CancellationToken cancellationToken, int qual, int diam)
        {
            cancellationToken.ThrowIfCancellationRequested();

            //var result = await _databaseCalls.GetData(cancellationToken).ConfigureAwait(false);
            //await Task.Delay(3000,cancellationToken);
            ReturnCoordinatesContainer arr = await Task.Run(async () => CircleCreator.CreateCircleWithYXZ(diam, (double)qual, cancellationToken), cancellationToken);
            Console.WriteLine("Parsing to JSON...");
            var json = JsonSerializer.Serialize(arr);
            //var resa = CircleCreator.CreateCircleWithYXZ(diam, qual, cancellationToken);
            Console.WriteLine("Returning...");
            return Ok(json);
        }
        [HttpGet("tab2")]
        public async Task<IActionResult> GetDataForTab1(string code)
        {
            TextureColor ret;
            switch (code)
	        {
                case "228GRENKA228": ret = new TextureColor { Texture = "GRYNKO.jpg", Color = "#FFFFFF" };
                break;
		        default: ret = new TextureColor { Texture = "iHate.png", Color = "#FF7400" };
                break;
	        }
            var json = JsonSerializer.Serialize(ret);
            return Ok(json);
        }
    }
}
