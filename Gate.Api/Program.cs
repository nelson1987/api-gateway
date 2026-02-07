var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.MapGet("/", (HttpContext ctx, ILoggerFactory loggerFactory) =>
{
    var logger = loggerFactory.CreateLogger("ReplicaLogger");

    var hostname = Environment.MachineName;
    var traceId = ctx.TraceIdentifier;

    logger.LogInformation(
        "Requisição atendida por {Hostname} | TraceId: {TraceId}",
        hostname,
        traceId
    );

    return Results.Ok(new
    {
        host = hostname,
        traceId
    });
});

app.MapGet("/health", () => Results.Ok("healthy"));
await app.RunAsync();